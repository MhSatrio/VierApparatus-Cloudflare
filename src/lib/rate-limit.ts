/**
 * Rate limiter. Uses Upstash Redis (REST) when configured so limits hold across serverless instances;
 * otherwise falls back to an in-memory fixed window (per instance, best effort). Fails open on Upstash errors
 * so a Redis outage never blocks genuine inquiries; honeypot/timing/validation still apply.
 */
const memory = new Map<string, { count: number; reset: number }>();

export async function rateLimit(key: string, limit: number, windowSec: number): Promise<{ ok: boolean; retryAfter: number }> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const k = `rl:${key}`;
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([["INCR", k], ["EXPIRE", k, windowSec, "NX"]]),
        cache: "no-store",
        signal: AbortSignal.timeout(2000),
      });
      const data = (await res.json()) as { result: number }[];
      const count = Number(data?.[0]?.result ?? 0);
      return { ok: count <= limit, retryAfter: windowSec };
    } catch {
      return { ok: true, retryAfter: 0 };
    }
  }

  const now = Date.now();
  if (memory.size > 5000) for (const [k, v] of memory) if (v.reset < now) memory.delete(k);
  const cur = memory.get(key);
  if (!cur || cur.reset < now) {
    memory.set(key, { count: 1, reset: now + windowSec * 1000 });
    return { ok: true, retryAfter: 0 };
  }
  cur.count++;
  return { ok: cur.count <= limit, retryAfter: Math.ceil((cur.reset - now) / 1000) };
}

/** Test helper. */
export const __resetRateLimit = () => memory.clear();
