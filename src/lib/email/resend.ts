import "server-only";

export interface SendResult {
  ok: boolean;
  id?: string;
  error?: string;
}

export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM);

/** Sends one email through the Resend HTTP API. */
export async function sendEmail(msg: { to: string; subject: string; html: string; text: string }): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return { ok: false, error: "Resend is not configured (RESEND_API_KEY, RESEND_FROM)." };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [msg.to], subject: msg.subject, html: msg.html, text: msg.text }),
      signal: AbortSignal.timeout(10_000),
    });
    const json = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
    return res.ok ? { ok: true, id: json.id } : { ok: false, error: json.message ?? `HTTP ${res.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "network error" };
  }
}
