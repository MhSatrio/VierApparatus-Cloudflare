"use client";

import { useState } from "react";
import { buildMarkdownTemplate, type TemplateInput } from "@/lib/content/template";

/**
 * Generates a Markdown template from the article's current form values. Nothing is saved; the person copies or downloads the
 * text, edits it in any editor, and pastes it back into the Markdown tab (or uploads the .md file) to create the article.
 */
export function MarkdownTemplate({ input }: { input: TemplateInput }) {
  const [text, setText] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const generate = () => {
    setText(buildMarkdownTemplate({ ...input, date: input.date || new Date().toISOString().slice(0, 10) }));
    setState("idle");
  };

  const download = () => {
    if (!text) return;
    const name = `${(input.slug || input.title || "article").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "article"}.md`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section aria-labelledby="template-title" className="space-y-3 rounded-xl border border-ink/10 bg-white p-5 shadow-card">
      <h2 id="template-title" className="text-xl">
        Markdown template
      </h2>
      <p className="text-sm text-ink/80">
        Builds the front matter from what you entered in <strong>Details &amp; SEO</strong> (title, address, summary, topic, author, tags, cover, search text, Article ID), plus headings for the
        article and a footnote for references. Fields you have not filled in stay empty, and the template says what each one needs.
      </p>
      {!text ? (
        <button type="button" className="btn btn-secondary btn-sm" onClick={generate}>
          Generate template
        </button>
      ) : (
        <div className="space-y-3">
          <label htmlFor="template-preview" className="block text-sm font-medium">
            Preview (plain Markdown)
          </label>
          <textarea id="template-preview" readOnly value={text} rows={Math.min(24, text.split("\n").length + 1)} spellCheck={false} onFocus={(e) => e.currentTarget.select()} className="field font-mono text-xs leading-5" />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(text);
                  setState("copied");
                } catch {
                  setState("failed");
                }
              }}
            >
              Copy
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={download}>
              Download .md
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={generate}>
              Regenerate
            </button>
            <span role="status" className="text-sm">
              {state === "copied" ? "Copied to the clipboard." : state === "failed" ? "Copy failed. Select the text and copy it by hand." : ""}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
