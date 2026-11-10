/**
 * The shape of the future read-aloud feature. Nothing implements this yet: no speech service is called and no code runs.
 * It exists so a provider (the browser's own speech, or a paid service later) can be added without touching the lesson pages:
 * the reading page marks its body as data-narration-root and its sections by heading id, and the player talks only to this interface.
 */

export type NarrationSection = { id: string; title: string; text: string };

export type NarrationState = { status: "idle" | "loading" | "playing" | "paused" | "error"; sectionId: string | null; progress: number; rate: number };

export interface NarrationProvider {
  /** Prepare the lesson: the sections in reading order, as plain text. */
  load(sections: NarrationSection[]): Promise<void>;
  play(fromSectionId?: string): Promise<void>;
  pause(): void;
  /** 0.5 to 2. */
  setRate(rate: number): void;
  subscribe(listener: (state: NarrationState) => void): () => void;
  dispose(): void;
}

/**
 * Splits a rendered lesson into narration sections at its level-2 and level-3 headings. Pure and dependency free, so the same
 * function can run on the server (to precompute sections) or in the browser.
 */
export function splitSections(html: string, headings: { id: string; text: string }[]): NarrationSection[] {
  const text = (h: string) => h.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
  const positions = headings.map((h) => ({ h, at: html.indexOf(`id="${h.id}"`) })).filter((p) => p.at >= 0);
  if (!positions.length) return [{ id: "start", title: "Lesson", text: text(html) }];
  const out: NarrationSection[] = [];
  const first = positions[0].at;
  const intro = text(html.slice(0, html.lastIndexOf("<", first) >= 0 ? html.lastIndexOf("<", first) : first));
  if (intro) out.push({ id: "start", title: "Introduction", text: intro });
  positions.forEach((p, i) => {
    const from = html.lastIndexOf("<", p.at);
    const to = i + 1 < positions.length ? html.lastIndexOf("<", positions[i + 1].at) : html.length;
    out.push({ id: p.h.id, title: p.h.text, text: text(html.slice(from, to)) });
  });
  return out;
}
