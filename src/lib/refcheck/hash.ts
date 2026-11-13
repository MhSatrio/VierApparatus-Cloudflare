import { createHash } from "node:crypto";

/**
 * A fingerprint of a reference list. A check records the fingerprint of the list it checked; if the list changes afterwards the
 * recorded check no longer applies, and the publish gate asks for a new check. Only the text and DOI of each reference count.
 */
export function refsHash(refs: { text: string; doi: string }[]): string {
  const canonical = JSON.stringify(refs.map((r) => [String(r.text ?? "").trim(), String(r.doi ?? "").trim()]));
  return createHash("sha256").update(canonical).digest("hex");
}

export function refsHashOf(refs: unknown): string {
  return refsHash(Array.isArray(refs) ? refs.filter((r): r is { text: string; doi: string } => !!r && typeof r === "object").map((r) => ({ text: String((r as { text?: unknown }).text ?? ""), doi: String((r as { doi?: unknown }).doi ?? "") })) : []);
}
