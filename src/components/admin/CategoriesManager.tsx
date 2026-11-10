"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiMessage, useApi } from "./AdminProvider";

type Cat = { id: string; slug: string; name: string; description: string; articleCount: number };

export function CategoriesManager({ initial }: { initial: Cat[] }) {
  const api = useApi();
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [asking, setAsking] = useState<string | null>(null);

  async function act(fn: () => Promise<{ ok: boolean; data: { message?: string } } & { status: number }>, okMsg: string) {
    setBusy(true);
    setMsg("");
    const r = await fn();
    setMsg(r.ok ? okMsg : (r.data.message ?? apiMessage(r as never)));
    if (r.ok) router.refresh();
    setBusy(false);
    return r.ok;
  }

  return (
    <div className="space-y-6">
      <form
        className="grid gap-3 rounded-xl border border-ink/10 bg-white p-5 shadow-card sm:grid-cols-[1fr_2fr_auto]"
        onSubmit={async (ev) => {
          ev.preventDefault();
          const f = ev.currentTarget;
          const d = new FormData(f);
          if (await act(() => api.post("/api/admin/categories", { name: d.get("name"), description: d.get("description") }), "Topic added.")) f.reset();
        }}
      >
        <label className="text-sm font-medium">
          New topic
          <input name="name" required minLength={2} maxLength={60} className="field mt-1 font-normal" />
        </label>
        <label className="text-sm font-medium">
          Short description (optional)
          <input name="description" maxLength={400} className="field mt-1 font-normal" />
        </label>
        <button type="submit" className="btn btn-primary btn-sm self-end" disabled={busy}>
          Add topic
        </button>
      </form>
      {msg && (
        <p role="status" className="rounded-lg bg-sky/50 p-3 font-medium">
          {msg}
        </p>
      )}
      <ul className="divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white shadow-card">
        {initial.map((c) => (
          <li key={c.id} className="p-4">
            <form
              className="grid gap-3 sm:grid-cols-[1fr_2fr_auto_auto] sm:items-end"
              onSubmit={async (ev) => {
                ev.preventDefault();
                const d = new FormData(ev.currentTarget);
                await act(() => api.put(`/api/admin/categories/${c.id}`, { name: d.get("name"), description: d.get("description") }), "Saved.");
              }}
            >
              <label className="text-sm font-medium">
                Name
                <input name="name" defaultValue={c.name} required minLength={2} maxLength={60} className="field mt-1 font-normal" />
              </label>
              <label className="text-sm font-medium">
                Description
                <input name="description" defaultValue={c.description} maxLength={400} className="field mt-1 font-normal" />
              </label>
              <button type="submit" className="btn btn-secondary btn-sm" disabled={busy}>
                Save
              </button>
              {asking === c.id ? (
                <span className="flex items-center gap-2 text-sm">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={busy}
                    onClick={() => {
                      setAsking(null);
                      void act(() => api.del(`/api/admin/categories/${c.id}`), "Topic deleted.");
                    }}
                  >
                    Yes, delete
                  </button>
                  <button type="button" className="underline underline-offset-4" onClick={() => setAsking(null)}>
                    Keep
                  </button>
                </span>
              ) : (
                <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => setAsking(c.id)}>
                  Delete
                </button>
              )}
            </form>
            <p className="mt-2 text-xs text-ink/60">
              /topics/{c.slug} · {c.articleCount} published article{c.articleCount === 1 ? "" : "s"}. The address does not change if you rename it. A topic can only be deleted when no article uses it.
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
