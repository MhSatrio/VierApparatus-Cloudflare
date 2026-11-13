import { conn } from "../db/client";
import { json, n, nowIso, s, type Row } from "../store/util";

/**
 * The event outbox. A row is written once when something happens on the site (an article is published, a product is published
 * or reviewed). The DCE app reads rows after the last id it has processed, so an event is never lost while the app is closed.
 * `dedupe_key` makes writing the same event twice harmless.
 */
export const EVENT_TYPES = ["article.published", "product.published", "product.reviewed"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export type ConnectorEvent = {
  id: number;
  createdAt: string;
  type: EventType;
  entityId: string;
  dedupeKey: string;
  payload: Record<string, unknown>;
};

const toEvent = (r: Row): ConnectorEvent => ({
  id: n(r.id),
  createdAt: s(r.ts),
  type: s(r.type) as EventType,
  entityId: s(r.entity_id),
  dedupeKey: s(r.dedupe_key),
  payload: json<Record<string, unknown>>(r.payload, {}),
});

/** Writes one event. Returns false when the same event was already recorded. */
export async function emitEvent(type: EventType, entityId: string, dedupeKey: string, payload: Record<string, unknown>): Promise<boolean> {
  const db = await conn();
  const r = await db.execute({
    sql: "INSERT OR IGNORE INTO connector_events(ts, type, entity_id, dedupe_key, payload) VALUES (?, ?, ?, ?, ?)",
    args: [nowIso(), type, entityId, dedupeKey, JSON.stringify(payload)],
  });
  return r.rowsAffected > 0;
}

/** The events after a cursor (an event id), oldest first. */
export async function eventsAfter(after: number, limit: number): Promise<ConnectorEvent[]> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM connector_events WHERE id > ? ORDER BY id LIMIT ?", args: [after, limit] });
  return r.rows.map(toEvent);
}

/** The newest events, newest first (for the admin page). */
export async function recentEvents(limit: number): Promise<ConnectorEvent[]> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM connector_events ORDER BY id DESC LIMIT ?", args: [limit] });
  return r.rows.map(toEvent);
}

export async function getEvent(id: number): Promise<ConnectorEvent | null> {
  const db = await conn();
  const r = await db.execute({ sql: "SELECT * FROM connector_events WHERE id = ?", args: [id] });
  return r.rows[0] ? toEvent(r.rows[0]) : null;
}
