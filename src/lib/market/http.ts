import "server-only";

/**
 * Minimal JSON fetch helper for third-party data providers: hard timeout,
 * generic user agent (never user-identifying), and typed errors.
 */

export class ProviderError extends Error {
  constructor(
    public provider: string,
    message: string,
    public status?: number,
  ) {
    super(`[${provider}] ${message}`);
    this.name = "ProviderError";
  }
}

export async function fetchJson<T>(
  provider: string,
  url: string,
  init: { headers?: Record<string, string>; timeoutMs?: number } = {},
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { accept: "application/json", "user-agent": "sensitor-data/0.1", ...init.headers },
      signal: AbortSignal.timeout(init.timeoutMs ?? 9000),
    });
  } catch (err) {
    throw new ProviderError(provider, `network error: ${(err as Error).message}`);
  }
  if (!res.ok) {
    throw new ProviderError(provider, `HTTP ${res.status}`, res.status);
  }
  try {
    return (await res.json()) as T;
  } catch {
    throw new ProviderError(provider, "invalid JSON response");
  }
}
