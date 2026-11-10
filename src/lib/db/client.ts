import { createClient as createWebClient, type Client } from "@libsql/client/web";

/**
 * One libSQL client per server instance. Production uses `@libsql/client/web`, which talks to Turso over HTTPS (fetch), so
 * the same code runs on Vercel and Cloudflare Workers.
 *
 * Local development (`next dev`, or a build made with LOCAL_DB=1) swaps in the Node client so a plain `file:` SQLite
 * database works with no server. LOCAL_DB is copied into the bundle as a literal by next.config.ts, so in a normal
 * production build the branch below is dead code and `./local-client` (and its native dependency) is never bundled.
 */
export class DbNotConfiguredError extends Error {
  constructor() {
    super("TURSO_DATABASE_URL is not set");
    this.name = "DbNotConfiguredError";
  }
}

let client: Client | null = null;
let ready: Promise<Client> | null = null;

async function open(): Promise<Client> {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) throw new DbNotConfiguredError();
  const authToken = process.env.TURSO_AUTH_TOKEN || undefined;
  if (process.env.LOCAL_DB === "1") {
    const { createLocalClient } = await import("./local-client");
    return createLocalClient(url, authToken);
  }
  return createWebClient({ url, authToken });
}

export const dbConfigured = () => Boolean(process.env.TURSO_DATABASE_URL);

/**
 * The handle every store uses. The first call opens the connection and creates/upgrades the tables (one cached promise per
 * instance, so later calls cost nothing); a failed attempt is not cached, so the next request retries.
 */
export function conn(): Promise<Client> {
  if (!ready) {
    ready = (async () => {
      const c = await open();
      const { migrate } = await import("./migrations");
      await migrate(c);
      client = c;
      return c;
    })().catch((e) => {
      ready = null;
      throw e;
    });
  }
  return ready;
}

export async function ensureSchema(): Promise<void> {
  await conn();
}

/** Synchronous access for scripts and tests, valid only after `await conn()` (or ensureSchema) has completed. */
export function db(): Client {
  if (!client) throw new Error("The database is not open yet: await conn() or ensureSchema() first.");
  return client;
}

/** Test helper: forget the cached client (e.g. after changing TURSO_DATABASE_URL). */
export function __resetDb() {
  client?.close();
  client = null;
  ready = null;
}
