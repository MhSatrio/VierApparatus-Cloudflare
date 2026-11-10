"use client";

import { useRef, useState } from "react";
import { MathEnhancer } from "@/components/MathEnhancer";
import { CALLOUT_TONES, type Block, type CalloutTone, type Inline } from "@/lib/content/schema";
import { escapeHtml } from "@/lib/content/text";
import { calloutLabel } from "@/lib/content/render";
import { InlineEditor } from "./InlineEditor";
import { isPlaceholderImage, youtubeId } from "./inline";
import { useImageUpload, type ImageKind, type PickedImage } from "./MediaPicker";

export type BlockEditorProps = {
  block: Block;
  onChange: (b: Block) => void;
  /** Enter at the end of a paragraph/heading: start a new paragraph below. */
  onEnterNew: () => void;
  onRemove: () => void;
  autoFocus: boolean;
  openLibrary: (done: (img: PickedImage) => void) => void;
  /** Where uploaded pictures are filed (articles by default; modules use "modules"). */
  imageKind?: ImageKind;
};

const small = "field !min-h-10 text-sm";
const lbl = "block text-xs font-semibold uppercase tracking-wide text-ink/60";

export function BlockEditor(p: BlockEditorProps) {
  const { block: b, onChange: set } = p;
  switch (b.type) {
    case "heading":
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={lbl}>Level</span>
            <select value={b.level} onChange={(e) => set({ ...b, level: Number(e.target.value) as 2 | 3 | 4 })} className={`${small} w-24`} aria-label="Heading level">
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
            </select>
          </div>
          <InlineEditor label="Heading" placeholder="Heading" value={b.content} onChange={(content) => set({ ...b, content })} onEnter={p.onEnterNew} onBackspaceEmpty={p.onRemove} autoFocus={p.autoFocus} className={b.level === 2 ? "text-2xl font-semibold" : b.level === 3 ? "text-xl font-semibold" : "text-lg font-semibold"} />
        </div>
      );

    case "paragraph":
      return (
        <div className="space-y-1">
          <InlineEditor label="Paragraph" placeholder="Write something, or press / use the + button to add another kind of block" value={b.content} onChange={(content) => set({ ...b, content })} onEnter={p.onEnterNew} onBackspaceEmpty={p.onRemove} autoFocus={p.autoFocus} className={`text-lg ${b.align === "center" ? "text-center" : b.align === "right" ? "text-right" : ""}`} />
          <div className="flex gap-1" role="group" aria-label="Text alignment">
            {(["left", "center", "right"] as const).map((a) => (
              <button key={a} type="button" onClick={() => set({ ...b, align: a })} aria-pressed={(b.align ?? "left") === a} className="rounded border border-ink/20 px-2 py-0.5 text-xs capitalize aria-pressed:bg-sky">
                {a}
              </button>
            ))}
          </div>
        </div>
      );

    case "image":
      return <ImageBlock {...p} block={b} />;

    case "list":
      return <ListBlock {...p} block={b} />;

    case "quote":
      return (
        <div className="space-y-2 border-l-4 border-sky pl-4">
          <InlineEditor label="Quote" placeholder="Quotation" multiline value={b.content} onChange={(content) => set({ ...b, content })} autoFocus={p.autoFocus} className="text-lg italic" />
          <input aria-label="Quote source" placeholder="Source (optional)" value={b.cite ?? ""} maxLength={300} onChange={(e) => set({ ...b, cite: e.target.value || undefined })} className={small} />
        </div>
      );

    case "callout":
      return (
        <div className={`space-y-2 rounded-lg border border-ink/15 border-l-4 p-3 ${b.tone === "note" ? "border-l-brand bg-sky/30" : "border-l-ink bg-white"}`}>
          <div className="flex flex-wrap items-center gap-2">
            <select aria-label="Callout type" value={b.tone} onChange={(e) => set({ ...b, tone: e.target.value as CalloutTone })} className={`${small} w-44`}>
              {CALLOUT_TONES.map((t) => (
                <option key={t} value={t}>
                  {calloutLabel(t)}
                </option>
              ))}
            </select>
            <input aria-label="Callout title" placeholder={`Title (default: ${calloutLabel(b.tone)})`} value={b.title ?? ""} maxLength={120} onChange={(e) => set({ ...b, title: e.target.value || undefined })} className={`${small} min-w-0 flex-1`} />
          </div>
          <InlineEditor label="Callout text" placeholder="Text" multiline value={b.content} onChange={(content) => set({ ...b, content })} autoFocus={p.autoFocus} />
          <p className="text-xs text-ink/60">Use Commentary for your own view and Speculation for guesses, so readers can tell them from established findings.</p>
        </div>
      );

    case "table":
      return <TableBlock {...p} block={b} />;

    case "code":
      return (
        <div className="space-y-2">
          <input aria-label="Code language" placeholder="Language (optional, e.g. python)" value={b.language ?? ""} maxLength={30} onChange={(e) => set({ ...b, language: e.target.value.replace(/[^A-Za-z0-9_+#.-]/g, "") || undefined })} className={`${small} w-64`} />
          <textarea aria-label="Code" value={b.code} onChange={(e) => set({ ...b, code: e.target.value })} rows={Math.min(14, Math.max(4, b.code.split("\n").length + 1))} spellCheck={false} className="field font-mono text-sm" />
        </div>
      );

    case "equation":
      return (
        <div className="space-y-2">
          <label className={lbl} htmlFor="eq-src">
            LaTeX
          </label>
          <textarea id="eq-src" value={b.latex} onChange={(e) => set({ ...b, latex: e.target.value })} rows={2} spellCheck={false} className="field font-mono text-sm" />
          <div className="prose-article !max-w-none rounded-lg bg-white p-3">
            <div key={b.latex} className="math-display" data-latex={b.latex} dangerouslySetInnerHTML={{ __html: `\\[${escapeHtml(b.latex)}\\]` }} />
            <MathEnhancer html={b.latex} />
          </div>
        </div>
      );

    case "divider":
      return <hr className="my-2 border-ink/30" aria-label="Divider" />;

    case "references":
      return <ReferencesBlock {...p} block={b} />;

    case "embed":
      return <EmbedBlock block={b} onChange={set} />;
  }
}

/** Stable React keys for a list of editable rows, so removing or inserting a row never shows another row's text. */
function useKeys(n: number) {
  const counter = useRef(n);
  const [keys, setKeys] = useState<string[]>(() => Array.from({ length: n }, (_, i) => `k${i}`));
  return {
    keys,
    insert: (index: number) => {
      const k = `k${counter.current++}`;
      setKeys((ks) => [...ks.slice(0, index), k, ...ks.slice(index)]);
      return k;
    },
    remove: (index: number) => setKeys((ks) => ks.filter((_, j) => j !== index)),
  };
}

function ListBlock({ block: b, onChange: set, onRemove, autoFocus }: BlockEditorProps & { block: Extract<Block, { type: "list" }> }) {
  const k = useKeys(b.items.length);
  const [focusKey, setFocusKey] = useState<string | null>(autoFocus ? "k0" : null);
  return (
    <div className="space-y-2">
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={b.ordered} onChange={(e) => set({ ...b, ordered: e.target.checked })} /> Numbered list
      </label>
      <ListTag ordered={b.ordered}>
        {b.items.map((item, i) => (
          <li key={k.keys[i] ?? i}>
            <InlineEditor
              label={`List item ${i + 1}`}
              placeholder="List item"
              value={item}
              autoFocus={focusKey === k.keys[i]}
              onChange={(v) => set({ ...b, items: b.items.map((x, j) => (j === i ? v : x)) })}
              onEnter={() => {
                setFocusKey(k.insert(i + 1));
                set({ ...b, items: [...b.items.slice(0, i + 1), [], ...b.items.slice(i + 1)] });
              }}
              onBackspaceEmpty={() => {
                if (b.items.length <= 1) return onRemove();
                setFocusKey(k.keys[i - 1] ?? k.keys[i + 1] ?? null);
                k.remove(i);
                set({ ...b, items: b.items.filter((_, j) => j !== i) });
              }}
            />
          </li>
        ))}
      </ListTag>
      <button
        type="button"
        className="text-sm font-medium text-brand underline"
        onClick={() => {
          setFocusKey(k.insert(b.items.length));
          set({ ...b, items: [...b.items, []] });
        }}
      >
        Add item
      </button>
    </div>
  );
}

function ReferencesBlock({ block: b, onChange: set }: BlockEditorProps & { block: Extract<Block, { type: "references" }> }) {
  const k = useKeys(b.items.length);
  const patch = (i: number, p: Partial<(typeof b.items)[number]>) => set({ ...b, items: b.items.map((x, j) => (j === i ? { ...x, ...p } : x)) });
  return (
    <div className="space-y-3">
      <p className="font-semibold">References</p>
      {b.items.map((it, i) => (
        <div key={k.keys[i] ?? i} className="space-y-2 rounded-lg border border-ink/15 bg-white p-3">
          <InlineEditor label={`Reference ${i + 1} citation`} placeholder="Author (year). Title. Journal, volume, pages." multiline value={it.text} onChange={(text) => patch(i, { text })} />
          <div className="grid gap-2 sm:grid-cols-2">
            <input aria-label={`Reference ${i + 1} DOI`} placeholder="DOI, e.g. 10.3389/fphar.2023.1213824" defaultValue={it.doi ?? ""} onChange={(e) => patch(i, { doi: e.target.value.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//, "") || undefined })} className={small} />
            <input aria-label={`Reference ${i + 1} link`} placeholder="Link (optional)" defaultValue={it.url ?? ""} onChange={(e) => patch(i, { url: e.target.value.trim() || undefined })} className={small} />
          </div>
          <button
            type="button"
            className="text-sm font-medium underline"
            onClick={() => {
              k.remove(i);
              set({ ...b, items: b.items.filter((_, j) => j !== i) });
            }}
          >
            Remove this reference
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-sm font-medium text-brand underline"
        onClick={() => {
          k.insert(b.items.length);
          set({ ...b, items: [...b.items, { text: [] }] });
        }}
      >
        Add a reference
      </button>
      <p className="text-xs text-ink/60">Only add sources you have actually read. Please do not invent or guess citations.</p>
    </div>
  );
}

function ListTag({ ordered, children }: { ordered: boolean; children: React.ReactNode }) {
  return ordered ? <ol className="list-decimal space-y-1 pl-6">{children}</ol> : <ul className="list-disc space-y-1 pl-6">{children}</ul>;
}

function EmbedBlock({ block: b, onChange }: { block: Extract<Block, { type: "embed" }>; onChange: (b: Block) => void }) {
  const [text, setText] = useState(`https://www.youtube.com/watch?v=${b.videoId}`);
  const id = youtubeId(text);
  return (
    <div className="space-y-2">
      <label className={lbl} htmlFor="yt">
        YouTube link
      </label>
      <input
        id="yt"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const v = youtubeId(e.target.value);
          if (v) onChange({ ...b, videoId: v });
        }}
        className={small}
        aria-invalid={!id}
      />
      {!id && <p role="alert" className="text-sm font-medium">Paste a YouTube link (youtube.com or youtu.be).</p>}
      <input aria-label="Video title" placeholder="Video title (required, for screen readers)" value={b.title} maxLength={200} onChange={(e) => onChange({ ...b, title: e.target.value })} className={small} />
      <p className="text-xs text-ink/60">Embedded with the privacy-enhanced youtube-nocookie.com player; it loads only when a reader scrolls to it.</p>
    </div>
  );
}

function ImageBlock({ block: b, onChange, openLibrary, imageKind }: BlockEditorProps & { block: Extract<Block, { type: "image" }> }) {
  const upload = useImageUpload(imageKind);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const placeholder = isPlaceholderImage(b);
  const apply = (img: PickedImage) => onChange({ ...b, src: img.url, width: img.width, height: img.height });
  return (
    <div className="space-y-2">
      {!placeholder ? (
         
        <img src={b.src} alt={b.alt} width={b.width} height={b.height} className="max-h-72 w-auto max-w-full rounded-lg border border-ink/15" />
      ) : (
        <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-ink/25 text-ink/60">No image chosen</div>
      )}
      <div className="flex flex-wrap gap-2">
        <label className="btn btn-secondary btn-sm cursor-pointer">
          {busy ? "Uploading…" : placeholder ? "Upload image" : "Replace image"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={busy}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              setBusy(true);
              setError("");
              const r = await upload(f);
              if (r.ok) apply(r.image);
              else setError(r.error);
              setBusy(false);
            }}
          />
        </label>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => openLibrary(apply)}>
          Choose from library
        </button>
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium">
          {error}
        </p>
      )}
      <div>
        <label className={lbl} htmlFor="alt">
          Alt text (describe the image for people who cannot see it)
        </label>
        <input id="alt" value={b.alt} maxLength={500} onChange={(e) => onChange({ ...b, alt: e.target.value })} className={small} aria-invalid={!placeholder && b.alt.trim().length < 3} />
      </div>
      <div>
        <span className={lbl}>Caption</span>
        <InlineEditor label="Image caption" placeholder="Caption (optional)" multiline value={b.caption ?? []} onChange={(caption) => onChange({ ...b, caption: caption.length ? caption : undefined })} className="text-sm" />
      </div>
      <input aria-label="Image credit" placeholder="Credit or source (optional)" value={b.credit ?? ""} maxLength={300} onChange={(e) => onChange({ ...b, credit: e.target.value || undefined })} className={small} />
    </div>
  );
}

function TableBlock({ block: b, onChange }: BlockEditorProps & { block: Extract<Block, { type: "table" }> }) {
  const cols = b.header.length;
  const setCell = (r: number, c: number, v: Inline[]) =>
    r < 0
      ? onChange({ ...b, header: b.header.map((x, j) => (j === c ? v : x)) })
      : onChange({ ...b, rows: b.rows.map((row, i) => (i === r ? row.map((x, j) => (j === c ? v : x)) : row)) });
  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <thead>
            <tr>
              {b.header.map((h, c) => (
                <th key={c} className="border border-ink/20 bg-sky p-1 align-top">
                  <InlineEditor label={`Column ${c + 1} heading`} placeholder="Heading" multiline value={h} onChange={(v) => setCell(-1, c, v)} className="font-semibold" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="border border-ink/20 p-1 align-top">
                    <InlineEditor label={`Row ${r + 1}, column ${c + 1}`} placeholder="" multiline value={cell} onChange={(v) => setCell(r, c, v)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-3 text-sm font-medium text-brand">
        <button type="button" className="underline" onClick={() => onChange({ ...b, rows: [...b.rows, Array.from({ length: cols }, () => [] as Inline[])] })}>
          Add row
        </button>
        <button type="button" className="underline" disabled={b.rows.length <= 1} onClick={() => onChange({ ...b, rows: b.rows.slice(0, -1) })}>
          Remove last row
        </button>
        <button type="button" className="underline" disabled={cols >= 12} onClick={() => onChange({ ...b, header: [...b.header, []], rows: b.rows.map((r) => [...r, []]) })}>
          Add column
        </button>
        <button type="button" className="underline" disabled={cols <= 1} onClick={() => onChange({ ...b, header: b.header.slice(0, -1), rows: b.rows.map((r) => r.slice(0, -1)) })}>
          Remove last column
        </button>
      </div>
      <InlineEditor label="Table caption" placeholder="Table caption (optional)" value={b.caption ?? []} onChange={(caption) => onChange({ ...b, caption: caption.length ? caption : undefined })} className="text-sm" />
    </div>
  );
}
