/**
 * The place where read-aloud will live. NOT active yet: no speech service is used and nothing is loaded. It shows the controls
 * a listener will get (play and pause, speed, section by section) switched off, so the layout is settled before the feature exists.
 *
 * Preparing for it (see lib/tts/narration.ts):
 *   - the lesson body is a single element marked data-narration-root,
 *   - each level-2/3 heading starts a section the narrator can jump to (the headings already carry stable ids),
 *   - a provider implements NarrationProvider (play, pause, seek to a section, set speed) and this bar drives it.
 */
export function ReadAloudBar() {
  return (
    <section aria-label="Read aloud (coming soon)" className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-dashed border-ink/25 bg-white px-4 py-2 text-sm text-ink/60">
      <span className="font-semibold text-ink/70">Listen to this module</span>
      <button type="button" disabled aria-disabled="true" className="inline-flex min-h-9 items-center rounded-md border border-ink/20 px-3 opacity-60">
        ▶ Play
      </button>
      <label className="inline-flex items-center gap-2 opacity-60">
        Speed
        <select disabled aria-disabled="true" defaultValue="1" className="rounded-md border border-ink/20 bg-white px-2 py-1">
          <option value="0.75">0.75×</option>
          <option value="1">1×</option>
          <option value="1.25">1.25×</option>
          <option value="1.5">1.5×</option>
        </select>
      </label>
      <span className="flex min-w-[8rem] flex-1 items-center gap-2 opacity-60" aria-hidden="true">
        <span className="h-1.5 flex-1 rounded-full bg-ink/15" />
        <span>0%</span>
      </span>
      <span className="rounded-full bg-ink/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">Coming soon</span>
    </section>
  );
}
