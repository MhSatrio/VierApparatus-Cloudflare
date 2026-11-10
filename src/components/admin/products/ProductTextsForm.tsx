"use client";

import { useState } from "react";
import type { ProductTexts } from "@/lib/store/products";
import { apiMessage, useApi } from "../AdminProvider";
import { Field, inputCls } from "../Dialog";
import { Card } from "../ui";

/** The disclaimer and the invitation at the top of the public Product page. Plain text; a blank line starts a new paragraph. */
export function ProductTextsForm({ initial, defaults }: { initial: ProductTexts; defaults: ProductTexts }) {
  const api = useApi();
  const [t, setT] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const r = await api.put("/api/admin/products/texts", t);
    setBusy(false);
    if (!r.ok) return setError(apiMessage(r));
    setMessage("Saved. The Product page shows the new text.");
  }

  const box = (key: "disclaimer" | "invite", title: string, hint: string) => (
    <Card title={title}>
      <p className="mb-4 text-sm text-ink/70">{hint}</p>
      <div className="space-y-4">
        <Field label="Heading">
          <input value={t[key].title} onChange={(e) => setT({ ...t, [key]: { ...t[key], title: e.target.value } })} maxLength={160} className={inputCls} required />
        </Field>
        <Field label="Text" hint="A blank line starts a new paragraph.">
          <textarea value={t[key].body} onChange={(e) => setT({ ...t, [key]: { ...t[key], body: e.target.value } })} rows={key === "disclaimer" ? 12 : 8} maxLength={5000} className={inputCls} required />
        </Field>
        <button type="button" className="text-sm font-semibold text-brand underline underline-offset-4" onClick={() => setT({ ...t, [key]: defaults[key] })}>
          Restore the original wording
        </button>
      </div>
    </Card>
  );

  return (
    <form onSubmit={save} className="space-y-6">
      {(error || message) && (
        <p role={error ? "alert" : "status"} className="rounded-lg border-2 border-ink p-3 font-medium">
          {error || message}
        </p>
      )}
      {box("disclaimer", "Disclaimer (very top of the Product page)", "Shown first, before any product. It says how the reviews are made and what inclusion does and does not mean.")}
      {box("invite", "Invitation to manufacturers and suppliers", "Shown after the disclaimer. Its button opens the contact form with “Product submission” already chosen; the button is part of the page and cannot be removed here.")}
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Saving…" : "Save the texts"}
      </button>
    </form>
  );
}
