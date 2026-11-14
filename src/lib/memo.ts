/**
 * A small in-memory TTL cache for read-mostly data that every public page needs (site settings, topic list, a module tree).
 *
 * It lives inside one server instance (one Cloudflare isolate or one Node process), so it costs nothing to read and is never shared
 * between instances: after a change in the admin area another instance can show the old value for at most `ttlMs`, which is far
 * shorter than the page cache window the public pages already have. The instance that performs a write can call `.clear()` to
 * see its own change at once.
 *
 * - Concurrent callers share one in-flight call (no stampede on a cold start).
 * - A rejected call is NOT remembered, so the next request retries.
 * - Values are shared between requests: callers must treat them as read-only.
 * - Switched off under test (NODE_ENV=test) so tests always see fresh data.
 */
export type TtlMemo<A extends unknown[], V> = ((...args: A) => Promise<V>) & { clear: () => void };

export function ttlMemo<A extends unknown[], V>(fn: (...args: A) => Promise<V>, opts: { ttlMs: number; max?: number; key?: (...args: A) => string }): TtlMemo<A, V> {
  const entries = new Map<string, { at: number; value: Promise<V> }>();
  const max = opts.max ?? 100;
  const call = ((...args: A): Promise<V> => {
    if (opts.ttlMs <= 0 || process.env.NODE_ENV === "test") return fn(...args);
    const key = opts.key ? opts.key(...args) : JSON.stringify(args);
    const now = Date.now();
    const hit = entries.get(key);
    if (hit && now - hit.at < opts.ttlMs) return hit.value;
    const value = fn(...args);
    const entry = { at: now, value };
    entries.delete(key);
    entries.set(key, entry);
    // Bound the memory: crawlers can ask for endless distinct keys. Maps keep insertion order, so the first key is the oldest.
    while (entries.size > max) entries.delete(entries.keys().next().value as string);
    value.catch(() => {
      if (entries.get(key) === entry) entries.delete(key);
    });
    return value;
  }) as TtlMemo<A, V>;
  call.clear = () => entries.clear();
  return call;
}
