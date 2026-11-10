import { conn } from "../db/client";
import { s } from "./util";

/**
 * Owner settings for the newsletter popup, kept in the existing settings table. The popup is OFF until the owner switches it on.
 */
export const POPUP_DEFAULTS = {
  enabled: false,
  title: "Get the VierApparatus newsletter",
  message: "New articles, explained clearly. A short e-mail when something new is published. No spam, and you can unsubscribe at any time.",
};

export type PopupSettings = typeof POPUP_DEFAULTS;

const KEYS = { enabled: "newsletter_popup_enabled", title: "newsletter_popup_title", message: "newsletter_popup_message" } as const;

export async function getPopupSettings(): Promise<PopupSettings> {
  const db = await conn();
  const r = await db.execute({
    sql: "SELECT key, value FROM settings WHERE key IN (?, ?, ?)",
    args: [KEYS.enabled, KEYS.title, KEYS.message],
  });
  const map = new Map(r.rows.map((x) => [s(x.key), s(x.value)]));
  return {
    enabled: map.get(KEYS.enabled) === "1",
    title: map.get(KEYS.title) || POPUP_DEFAULTS.title,
    message: map.get(KEYS.message) || POPUP_DEFAULTS.message,
  };
}

export async function setPopupSettings(v: PopupSettings): Promise<void> {
  const title = v.title.trim().slice(0, 100);
  const message = v.message.trim().slice(0, 400);
  if (title.length < 4) throw new Error("The popup title needs at least 4 characters.");
  if (message.length < 10) throw new Error("The popup message needs at least 10 characters.");
  const db = await conn();
  await db.batch(
    [
      { sql: "INSERT INTO settings(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", args: [KEYS.enabled, v.enabled ? "1" : "0"] },
      { sql: "INSERT INTO settings(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", args: [KEYS.title, title] },
      { sql: "INSERT INTO settings(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", args: [KEYS.message, message] },
    ],
    "write",
  );
}
