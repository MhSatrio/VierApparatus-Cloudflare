import { HttpError } from "../auth/guard";
import { randomToken, sha256Hex, newId } from "../crypto";
import { conn } from "../db/client";
import { rateLimit } from "../rate-limit";
import { json, n, nowIso, s, sn, type Row } from "../store/util";

/**
 * Access tokens for the website connector (the DCE desktop app). A token is shown once when it is created; only its SHA-256
 * hash is stored. What a token may do is decided by its scopes, and the owner can revoke it at any time (it stops working on the
 * next request). Tokens never grant access to the admin area: they only reach the /api/connector/v1 routes.
 */
export const CONNECTOR_SCOPES = ["events:read", "jobs:run"] as const;
export type ConnectorScope = (typeof CONNECTOR_SCOPES)[number];

export const SCOPE_TEXT: Record<ConnectorScope, string> = {
  "events:read": "Read the website events: articles published, products published and products reviewed",
  "jobs:run": "Take the jobs the owner sends (claim them, then report the result)",
};

export type ConnectorToken = {
  id: string;
  name: string;
  scopes: ConnectorScope[];
  createdAt: string;
  createdBy: string | null;
  lastUsedAt: string | null;
  lastSeenAt: string | null;
  clientCursor: number;
  clientVersion: string;
  clientMessage: string;
  revokedAt: string | null;
};

const toToken = (r: Row): ConnectorToken => ({
  id: s(r.id),
  name: s(r.name),
  scopes: (json<string[]>(r.scopes, []) as string[]).filter((x): x is ConnectorScope => (CONNECTOR_SCOPES as readonly string[]).includes(x)),
  createdAt: s(r.created_at),
  createdBy: sn(r.created_by),
  lastUsedAt: sn(r.last_used_at),
  lastSeenAt: sn(r.last_seen_at),
  clientCursor: n(r.client_cursor),
  clientVersion: s(r.client_version),
  clientMessage: s(r.client_message),
  revokedAt: sn(r.revoked_at),
});

export async function createConnectorToken(actorId: string | null, name: string, scopes: ConnectorScope[]): Promise<{ token: string; record: ConnectorToken }> {
  const token = `vca_${randomToken(32)}`;
  const id = newId("tok_");
  const db = await conn();
  await db.execute({
    sql: "INSERT INTO connector_tokens(id, name, token_hash, scopes, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    args: [id, name.trim().slice(0, 80), await sha256Hex(token), JSON.stringify([...new Set(scopes)]), actorId, nowIso()],
  });
  const record = (await listConnectorTokens()).find((t) => t.id === id)!;
  return { token, record };
}

export async function listConnectorTokens(): Promise<ConnectorToken[]> {
  const db = await conn();
  const r = await db.execute("SELECT * FROM connector_tokens ORDER BY created_at DESC");
  return r.rows.map(toToken);
}

/** Revokes a token. Returns false when there is no such active token. */
export async function revokeConnectorToken(id: string): Promise<boolean> {
  const db = await conn();
  const r = await db.execute({ sql: "UPDATE connector_tokens SET revoked_at = ? WHERE id = ? AND revoked_at IS NULL", args: [nowIso(), id] });
  return r.rowsAffected > 0;
}

/**
 * Checks the bearer token and, when given, its scope. 401 for an unknown or revoked token, 403 for a missing scope, 429 when a
 * token makes too many requests. `scope === null` only checks that the token is valid (used by the connection test).
 */
export async function authenticateConnector(req: Request, scope: ConnectorScope | null): Promise<ConnectorToken> {
  const m = /^Bearer\s+(vca_[A-Za-z0-9_-]{20,120})$/.exec((req.headers.get("authorization") ?? "").trim());
  if (!m) throw new HttpError(401, "unauthorized", "Send the token as Authorization: Bearer <token>.");
  const db = await conn();
  const row = (await db.execute({ sql: "SELECT * FROM connector_tokens WHERE token_hash = ?", args: [await sha256Hex(m[1])] })).rows[0];
  if (!row || row.revoked_at) throw new HttpError(401, "unauthorized", "The token is unknown or was revoked.");
  const t = toToken(row);
  if (scope && !t.scopes.includes(scope)) throw new HttpError(403, "forbidden", `This token lacks the “${scope}” permission.`);
  const rl = await rateLimit(`connector:${t.id}`, 120, 60);
  if (!rl.ok) throw new HttpError(429, "rate_limited", "Too many requests from this token. Slow down.");
  await db.execute({ sql: "UPDATE connector_tokens SET last_used_at = ? WHERE id = ?", args: [nowIso(), t.id] });
  return t;
}

/** What the client reports about itself (its version, how far it has read the events, a short message). */
export async function recordClientStatus(tokenId: string, st: { cursor?: number; version?: string; message?: string }): Promise<void> {
  const db = await conn();
  const sets: string[] = ["last_seen_at = ?"];
  const args: (string | number)[] = [nowIso()];
  if (st.cursor !== undefined) { sets.push("client_cursor = ?"); args.push(Math.max(0, Math.floor(st.cursor))); }
  if (st.version !== undefined) { sets.push("client_version = ?"); args.push(st.version.slice(0, 40)); }
  if (st.message !== undefined) { sets.push("client_message = ?"); args.push(st.message.slice(0, 300)); }
  await db.execute({ sql: `UPDATE connector_tokens SET ${sets.join(", ")} WHERE id = ?`, args: [...args, tokenId] });
}
