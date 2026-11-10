"use client";

import { useRef, useState } from "react";
import type { ImportMeta } from "@/lib/content/markdown";
import type { Block } from "@/lib/content/schema";
import { apiMessage, useApi } from "../AdminProvider";

export type ImportOutcome = { meta: ImportMeta; blocks: Block[]; warnings: string[]; missing: string[] };

const SAMPLE = `---
title: "Understanding Minimum Inhibitory Concentration"
slug: "understanding-minimum-inhibitory-concentration"
description: "An introduction to MIC and its role in antimicrobial testing."
category: "Microbiology"
author: "VierApparatus Editorial"
---

# Introduction

Minimum inhibitory concentration is an important concept in microbiology.

## Understanding MIC

The minimum inhibitory concentration represents...
`;

/**
 * Paste or upload Markdown. The server converts it into the same canonical blocks the visual editor uses (nothing is
 * saved yet); the owner then reviews it, fixes anything flagged, and previews it with the real article template.
 */
export function MarkdownImport({ hasContent, onImported, onError }: { hasContent: boolean; onImported: (o: ImportOutcome) => void; onError: (m: string) => void }) {
  const api = useApi();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [fileName, setFileName] = useState("");
  const input = useRef<HTMLInputElement>(null);

  async function convert() {
    if (hasContent && !window.confirm("This replaces the content currently in the visual editor (empty fields in Details are filled, existing ones are kept). Continue?")) return;
    setBusy(true);
    onError("");
    const r = await api.post<{ meta?: ImportMeta; doc?: { blocks: Block[] }; warnings?: string[]; missing?: string[] }>("/api/admin/articles/import", { markdown: text });
    setBusy(false);
    if (!r.ok || !r.data.doc) {
      onError(apiMessage(r));
      return;
    }
    onImported({ meta: r.data.meta ?? {}, blocks: r.data.doc.blocks, warnings: r.data.warnings ?? [], missing: r.data.missing ?? [] });
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl">Import Markdown</h2>
        <p className="mt-1 text-ink/75">
          Paste Markdown or upload a <code>.md</code> file. Front matter is optional; anything missing can be filled in afterwards. Raw HTML is removed. Publishing is always a separate step.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={input}
          type="file"
          accept=".md,.markdown,.txt,text/markdown,text/plain"
          className="sr-only"
          id="md-file"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (!f) return;
            if (f.size > 300_000) {
              onError("That file is larger than 300 KB.");
              return;
            }
            setFileName(f.name);
            setText(await f.text());
          }}
        />
        <label htmlFor="md-file" className="btn btn-secondary btn-sm cursor-pointer">
          Choose a Markdown file
        </label>
        {fileName && <span className="text-sm text-ink/70">{fileName}</span>}
        <button type="button" className="text-sm font-medium text-brand underline" onClick={() => setText(SAMPLE)}>
          Insert an example
        </button>
      </div>
      <label className="block">
        <span className="sr-only">Markdown</span>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={18} spellCheck={false} placeholder="# Title&#10;&#10;Your article in Markdown…" className="field font-mono text-sm" maxLength={400_000} />
      </label>
      <button type="button" className="btn btn-primary" disabled={busy || text.trim().length === 0} onClick={() => void convert()}>
        {busy ? "Converting…" : "Convert to article"}
      </button>
      <p className="text-sm text-ink/70">Supported: headings, paragraphs, bold/italic, links, lists, tables, quotes, code, images (https), equations ($…$ and $$…$$), footnotes (become References) and callouts written as <code>&gt; [!NOTE]</code>, <code>[!COMMENTARY]</code>, <code>[!SPECULATION]</code>.</p>
    </div>
  );
}
