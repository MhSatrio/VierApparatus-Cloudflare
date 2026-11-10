"use client";

import Link from "next/link";
import { describedBy, Field } from "./form/Field";
import { useSubmit } from "./form/useSubmit";
import { site } from "@/lib/site";

export function ContributeForm() {
  const { state, submit } = useSubmit("/api/contribute");
  const e = state.fields;
  const sending = state.status === "sending";

  if (state.status === "done") {
    return (
      <div role="status" className="rounded-xl border border-brand/40 bg-sky/40 p-6">
        <h2 className="text-2xl">Thank you. Your proposal has been received.</h2>
        <p className="mt-2">It is now waiting for editorial review. We will reply by e-mail, whether the answer is yes, no or &ldquo;not yet&rdquo;. Submitting does not guarantee publication and does not create an account.</p>
      </div>
    );
  }

  const text = (id: string, label: string, opts: { required?: boolean; max: number; hint?: string; type?: string; autoComplete?: string }) => (
    <Field id={id} label={label} required={opts.required} hint={opts.hint} error={e[id]}>
      <input
        id={id}
        name={id}
        type={opts.type ?? "text"}
        maxLength={opts.max}
        autoComplete={opts.autoComplete}
        className="field"
        aria-invalid={e[id] ? true : undefined}
        aria-describedby={describedBy(id, e[id], opts.hint)}
      />
    </Field>
  );
  const area = (id: string, label: string, opts: { required?: boolean; max: number; rows: number; hint?: string }) => (
    <Field id={id} label={label} required={opts.required} hint={opts.hint} error={e[id]}>
      <textarea id={id} name={id} rows={opts.rows} maxLength={opts.max} className="field" aria-invalid={e[id] ? true : undefined} aria-describedby={describedBy(id, e[id], opts.hint)} />
    </Field>
  );

  return (
    <form
      noValidate
      encType="multipart/form-data"
      onSubmit={(ev) => {
        ev.preventDefault();
        void submit(ev.currentTarget);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {text("name", "Your name", { required: true, max: 100, autoComplete: "name" })}
        {text("email", "E-mail", { required: true, max: 200, type: "email", autoComplete: "email" })}
      </div>
      {text("title", "Proposed article title", { required: true, max: 200 })}
      {text("topic", "Topic or field", { required: true, max: 120, hint: "For example: microbiology, research methods, climate science." })}
      {area("proposal", "Short article proposal", { required: true, max: 4000, rows: 6, hint: "What will the article explain, why does it matter, and what evidence will it rest on?" })}
      {area("background", "Relevant scientific background", { max: 2000, rows: 4, hint: "Your training or experience with this subject. No institution is required." })}
      {area("links", "References or supporting links", { max: 1500, rows: 3, hint: "Papers, datasets or earlier writing. One per line, starting with https://" })}
      <Field id="file" label="Article draft" hint="Markdown (.md) or text (.txt), up to 300 KB." error={e.file}>
        <input id="file" name="file" type="file" accept=".md,.markdown,.txt,text/markdown,text/plain" className="field py-2" />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="rounded-lg bg-sky/40 p-4 text-[0.95rem]">
        All submissions are subject to editorial review, covering scientific accuracy, originality, references and relevance. A proposal does not guarantee publication, and sending one does not create an account or give access to the admin area.
      </p>
      {state.status === "error" && (
        <p role="alert" className="rounded-lg border-2 border-ink p-3 font-medium">
          {state.message}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? "Sending…" : "Send proposal"}
      </button>
      <p className="text-sm text-ink/70">
        Questions first? Write to{" "}
        <a className="text-brand underline underline-offset-4" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        . See the{" "}
        <Link className="text-brand underline underline-offset-4" href="/privacy">
          privacy notice
        </Link>
        .
      </p>
    </form>
  );
}
