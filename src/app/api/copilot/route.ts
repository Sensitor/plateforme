import { NextResponse, type NextRequest } from "next/server";
import { getCoverageQuotes } from "@/lib/market/service";
import { getServerUser } from "@/lib/supabase/server";
import { buildContext, COPILOT_MODES, type CopilotMode } from "@/lib/copilot/context";
import { stripDashes, systemPrompt } from "@/lib/copilot/prompt";
import { COPILOT_LIMITS, GUEST_COOKIE, guestCookieValue, readGuestCount, userQuota, type QuotaState } from "@/lib/copilot/quota";

/**
 * Research Copilot: streams an OpenAI answer grounded in Sensitor's dossiers.
 * Response body is plain text; metadata travels in headers.
 */
interface Body {
  mode?: string;
  projects?: unknown;
  messages?: unknown;
}

type Msg = { role: "user" | "assistant"; content: string };

function parseMessages(raw: unknown): Msg[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const msgs = raw
    .slice(-10)
    .filter((m): m is Msg => !!m && typeof m === "object" && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
  if (!msgs.length || msgs[msgs.length - 1].role !== "user" || !msgs[msgs.length - 1].content.trim()) return null;
  return msgs;
}

export async function POST(request: NextRequest) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "The Copilot is not configured on this deployment (OPENAI_API_KEY)." }, { status: 503 });

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const mode: CopilotMode = COPILOT_MODES.includes(body.mode as CopilotMode) ? (body.mode as CopilotMode) : "learn";
  const projects = Array.isArray(body.projects) ? body.projects.filter((p): p is string => typeof p === "string").slice(0, 3) : [];
  const messages = parseMessages(body.messages);
  if (!messages) return NextResponse.json({ error: "Ask a question first." }, { status: 400 });

  // Quota
  const guestRaw = request.cookies.get(GUEST_COOKIE)?.value;
  const { supabase, user } = await getServerUser();
  const quota: QuotaState =
    supabase && user ? await userQuota(supabase, user.id, guestRaw) : { tier: "guest", used: readGuestCount(guestRaw), limit: COPILOT_LIMITS.guest, store: "cookie" };
  if (quota.used >= quota.limit) {
    return NextResponse.json(
      {
        error: user
          ? `You have used your ${quota.limit} Copilot questions for today. The counter resets at midnight UTC.`
          : `Guests can ask ${quota.limit} questions per day. Create a free account for ${COPILOT_LIMITS.free} per day.`,
        signedIn: Boolean(user),
        limit: quota.limit,
      },
      { status: 429 },
    );
  }

  // Grounding: market data only when a project is in scope.
  const question = messages.filter((m) => m.role === "user").map((m) => m.content).join("\n");
  let ctx = buildContext(mode, question, projects, null);
  if (ctx.refs.projects.length) ctx = buildContext(mode, question, projects, await getCoverageQuotes());

  const today = new Date().toISOString().slice(0, 10);
  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
      stream: true,
      reasoning_effort: "low",
      max_completion_tokens: 2000,
      messages: [{ role: "system", content: `${systemPrompt(mode, today)}\n\nCONTEXT\n${ctx.text}` }, ...messages],
    }),
    signal: request.signal,
  }).catch(() => null);

  if (!upstream?.ok || !upstream.body) {
    const detail = upstream ? await upstream.text().catch(() => "") : "";
    console.error("[copilot] upstream error", upstream?.status, detail.slice(0, 300));
    return NextResponse.json({ error: "The Copilot is unavailable right now. Please try again in a minute." }, { status: 502 });
  }

  // Count the question once the model has accepted it.
  if (quota.store === "db" && supabase && user) await supabase.from("copilot_usage").insert({ user_id: user.id, mode });

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.trim();
          if (!data.startsWith("data:")) continue;
          const payload = data.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload) as { choices?: { delta?: { content?: string } }[] };
            const text = json.choices?.[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(stripDashes(text)));
          } catch {
            // partial or keep-alive line
          }
        }
      },
    }),
  );

  const res = new NextResponse(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Copilot-Context": encodeURIComponent(JSON.stringify(ctx.refs)),
      "X-Copilot-Remaining": String(Math.max(0, quota.limit - quota.used - 1)),
      "X-Copilot-Limit": String(quota.limit),
    },
  });
  if (quota.store === "cookie") {
    res.cookies.set(GUEST_COOKIE, guestCookieValue(quota.used + 1), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 26, path: "/" });
  }
  return res;
}

/** Remaining questions today, for the Copilot page header. */
export async function GET(request: NextRequest) {
  const guestRaw = request.cookies.get(GUEST_COOKIE)?.value;
  const { supabase, user } = await getServerUser();
  const quota: QuotaState =
    supabase && user ? await userQuota(supabase, user.id, guestRaw) : { tier: "guest", used: readGuestCount(guestRaw), limit: COPILOT_LIMITS.guest, store: "cookie" };
  return NextResponse.json(
    { configured: Boolean(process.env.OPENAI_API_KEY), signedIn: Boolean(user), tier: quota.tier, used: quota.used, limit: quota.limit, remaining: Math.max(0, quota.limit - quota.used) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
