"use client";

import { useRef, useState } from "react";
import { buildModuleTemplate, moduleFileName, moduleToMarkdown, type ModuleMdInput } from "@/lib/content/module-export";
import type { ModuleImport } from "@/lib/content/module-import";
import { apiMessage, useApi } from "../AdminProvider";
import { Card } from "../ui";

export type ImportedModule = ModuleImport & { mismatches: string[] };

function download(name: string, text: string) {
  const url = URL.createObjectURL(new Blob(["﻿", text], { type: "text/markdown;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const same = (a: string, b: string) => {
  const x = a.trim().toLowerCase();
  const y = b.trim().toLowerCase();
  return !x || !y || x === y || x.includes(y) || y.includes(x);
};

/**
 * Import, template and export of a module as Markdown. Import converts a file (or pasted text) into the editor's fields on the
 * server, the person reviews it, and nothing is saved until they press Save. The template and the export are built in the browser
 * from what is on screen, saved or not.
 */
export function ModuleMarkdownPanel({
  current, where, hasContent, editable, onImported, onError,
}: {
  current: ModuleMdInput;
  where: { subject: string; specialization: string; level: string };
  hasContent: boolean;
  editable: boolean;
  onImported: (r: ImportedModule) => void;
  onError: (m: string) => void;
}) {
  const api = useApi();
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  async function convert() {
    if (hasContent && !window.confirm("This replaces the title, summary, objectives, references and body in the editor with the file's content. Nothing is saved until you press Save. Continue?")) return;
    setBusy(true);
    onError("");
    const r = await api.post<ModuleImport>("/api/admin/modules/import", { markdown: text });
    setBusy(false);
    if (!r.ok || !r.data.doc) return onError(apiMessage(r));
    const meta = r.data.meta ?? {};
    const mismatches: string[] = [];
    if (!same(meta.subject ?? "", where.subject)) mismatches.push(`The file says the subject is "${meta.subject}", but this module belongs to ${where.subject}.`);
    if (!same(meta.specialization ?? "", where.specialization)) mismatches.push(`The file says the specialization is "${meta.specialization}", but this module belongs to ${where.specialization}.`);
    if (!same(meta.academicLevel ?? "", where.level)) mismatches.push(`The file says the academic level is "${meta.academicLevel}", but this module is in "${where.level}".`);
    onImported({ ...r.data, mismatches });
  }

  return (
    <div className="space-y-6">
      <Card title="Import Markdown">
        <p className="text-sm text-ink/75">
          Upload a <code>.md</code> file or paste Markdown. The details in its front matter and its lesson fill this editor; you review everything, then save. Importing never publishes. A line such as <code>## Learning Objectives</code> followed by a list
          becomes the objectives, and a <code>## References</code> list becomes the reference list (a DOI link at the end of a reference is read as its DOI).
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            ref={input}
            type="file"
            accept=".md,.markdown,.txt,text/markdown,text/plain"
            className="sr-only"
            id="module-md-file"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              if (f.size > 300_000) return onError("That file is larger than 300 KB.");
              setFileName(f.name);
              setText(await f.text());
            }}
          />
          <label htmlFor="module-md-file" className="btn btn-secondary btn-sm cursor-pointer">
            Choose a Markdown file
          </label>
          {fileName && <span className="text-sm text-ink/70">{fileName}</span>}
        </div>
        <label className="mt-4 block">
          <span className="sr-only">Markdown</span>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={12} spellCheck={false} placeholder={"---\ntitle: …\n---\n\n# Title\n\nThe lesson in Markdown…"} className="field font-mono text-sm" maxLength={400_000} />
        </label>
        <p className="mt-3">
          <button type="button" className="btn btn-primary btn-sm" disabled={!editable || busy || text.trim().length === 0} onClick={() => void convert()}>
            {busy ? "Converting…" : "Import into this module"}
          </button>
        </p>
        <p className="mt-3 text-xs text-ink/65">
          Supported: headings, paragraphs, bold/italic, links, lists, tables, quotes, code, images (https), equations ($…$ and $$…$$), footnotes (become references) and callouts (<code>&gt; [!NOTE]</code>, <code>[!COMMENTARY]</code>,{" "}
          <code>[!SPECULATION]</code>). Raw HTML is removed.
        </p>
      </Card>

      <Card title="Template">
        <p className="text-sm text-ink/75">A blank module in the format above, with the front matter and the usual headings, ready to be written outside the site and imported later. Every heading can be changed, removed or added to.</p>
        <p className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => download("module-template.md", buildModuleTemplate({ subject: where.subject, specialization: where.specialization, academicLevel: where.level, author: current.author }))}>
            Download a template for this level
          </button>
          <a href="/templates/module-template.md" download className="text-sm font-semibold text-brand underline underline-offset-4">
            Generic template (.md)
          </a>
        </p>
      </Card>

      <Card title="Export">
        <p className="text-sm text-ink/75">
          Download this module as a Markdown file: its details as front matter, then the lesson with headings, formatting, tables, equations, image links and the references with their DOI. It includes what you have typed but not yet saved.
        </p>
        <p className="mt-4">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => download(moduleFileName(current.title), moduleToMarkdown(current))}>
            Export as Markdown (.md)
          </button>
        </p>
      </Card>
    </div>
  );
}
