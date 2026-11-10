"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NEXT_STATUSES, PRODUCT_STATUSES, PRODUCT_STATUS_LABEL, REVIEW_STATUSES, REVIEW_STATUS_SHORT, type ProductListItem, type ProductStatus, type ReviewStatus } from "@/lib/products/shared";
import { apiMessage, useApi } from "../AdminProvider";
import { dateOnly } from "../ui";

type Counts = Record<ProductStatus | "all", number>;
type Query = { q: string; status: string; category: string; manufacturer: string; review: string; origin: string; sort: string; dir: "asc" | "desc"; page: number; perPage: number };
type Data = { items: ProductListItem[]; total: number; page: number; pageCount: number; counts: Counts };
type CellField = "name" | "manufacturer" | "modelNumber" | "category" | "shortDescription" | "imageUrl" | "productUrl" | "manufacturerUrl";

const STATUS_STYLE: Record<ProductStatus, string> = {
  draft: "bg-ink/10 text-ink",
  under_review: "bg-sky text-ink",
  approved: "bg-brand/15 text-ink",
  published: "bg-brand text-white",
  archived: "bg-ink text-white",
  rejected: "bg-ink/70 text-white",
};

const small = "rounded border border-ink/20 px-2 py-1 text-sm hover:border-brand disabled:opacity-40";

/**
 * The Product Manager: an editable table for large catalogues. Search, filters and pages run on the server (a catalogue can hold
 * thousands of products), a cell is edited in place and saved on its own, rows are selected for bulk changes, and "open" goes to the
 * full editor. Every change is checked again on the server, including the publication workflow.
 */
/**
 * `owner` is false for a contributor with the products permission: they see only their own products, cannot select rows for bulk
 * changes or export, cannot edit the review status, and can only send their own drafts for review. The server enforces all of this.
 */
export function ProductManager({ initial, categories, manufacturers, initialQuery, owner = true }: { initial: Data; categories: { name: string; slug: string; count: number }[]; manufacturers: { name: string; count: number }[]; initialQuery: Query; owner?: boolean }) {
  const api = useApi();
  const [q, setQ] = useState<Query>(initialQuery);
  const [data, setData] = useState<Data>(initial);
  const [search, setSearch] = useState(initialQuery.q);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [failures, setFailures] = useState<{ ref: string; reason: string }[]>([]);
  const [bulkCategory, setBulkCategory] = useState("");
  const first = useRef(true);

  const qs = useCallback((x: Query) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(x)) if (v !== "" && v !== 0 && !(k === "dir" && v === "asc") && !(k === "perPage" && v === 50)) p.set(k, String(v));
    return p.toString();
  }, []);

  const load = useCallback(
    async (x: Query) => {
      setLoading(true);
      const r = await api.get<Data>(`/api/admin/products?${qs(x)}`);
      setLoading(false);
      if (!r.ok) return setError(apiMessage(r));
      setData(r.data);
      setSelected(new Set());
      window.history.replaceState(null, "", `/admin/products${qs(x) ? `?${qs(x)}` : ""}`);
    },
    [api, qs],
  );

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    void load(q);
  }, [q, load]);

  // the search box waits for a pause in typing
  useEffect(() => {
    const t = setTimeout(() => search !== q.q && setQ((x) => ({ ...x, q: search, page: 1 })), 350);
    return () => clearTimeout(t);
  }, [search, q.q]);

  const set = (patch: Partial<Query>) => setQ((x) => ({ ...x, page: 1, ...patch }));
  const sortBy = (key: string) => setQ((x) => ({ ...x, sort: key, dir: x.sort === key && x.dir === "asc" ? "desc" : "asc", page: 1 }));
  const ids = useMemo(() => data.items.map((i) => i.id), [data.items]);
  const allOn = ids.length > 0 && ids.every((id) => selected.has(id));

  /** Replaces one row after a change, without reloading the table. */
  const patchRow = (id: string, patch: Partial<ProductListItem>) => setData((d) => ({ ...d, items: d.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }));

  async function saveCell(item: ProductListItem, field: CellField | "reviewStatus", value: string) {
    setError("");
    setMessage("");
    // the table does not hold a product's version: read it first, so a stale tab cannot overwrite a newer save
    const cur = await api.get<{ product: { version: number } }>(`/api/admin/products/${item.id}`);
    if (!cur.ok) return setError(apiMessage(cur));
    const r = await api.patch<{ version?: number; category?: string; name?: string }>(`/api/admin/products/${item.id}`, { field, value, expectedVersion: cur.data.product.version });
    if (!r.ok) return setError(apiMessage(r));
    patchRow(item.id, { [field]: value, ...(field === "category" ? { category: r.data.category ?? value } : {}), updatedAt: new Date().toISOString() } as Partial<ProductListItem>);
    setMessage(`${item.ref} saved.`);
  }

  async function setStatus(item: ProductListItem, status: ProductStatus) {
    setError("");
    setMessage("");
    const r = await api.post<{ problems?: string[] }>(`/api/admin/products/${item.id}/status`, { status });
    if (!r.ok) return setError([apiMessage(r), ...(r.data.problems ?? [])].join(" "));
    patchRow(item.id, { status });
    setMessage(`${item.ref} is now ${PRODUCT_STATUS_LABEL[status].toLowerCase()}.`);
    setData((d) => ({ ...d, counts: { ...d.counts, [item.status]: Math.max(0, d.counts[item.status] - 1), [status]: d.counts[status] + 1 } }));
  }

  async function bulk(action: Record<string, unknown>, label: string) {
    if (!selected.size) return;
    setError("");
    setMessage("");
    setFailures([]);
    const r = await api.post<{ done: number; failed: { ref: string; reason: string }[] }>("/api/admin/products/bulk", { ids: [...selected], action });
    if (!r.ok) return setError(apiMessage(r));
    setMessage(`${label}: ${r.data.done} changed${r.data.failed.length ? `, ${r.data.failed.length} could not be changed` : ""}.`);
    setFailures(r.data.failed);
    await load(q);
  }

  const th = (key: string, label: string) => (
    <th scope="col" className="whitespace-nowrap px-3 py-2 text-left text-sm font-semibold">
      <button type="button" onClick={() => sortBy(key)} className="inline-flex items-center gap-1 hover:text-brand" aria-label={`Sort by ${label}`}>
        {label}
        <span aria-hidden="true" className="text-xs text-ink/50">
          {q.sort === key ? (q.dir === "asc" ? "▲" : "▼") : ""}
        </span>
      </button>
    </th>
  );
  const plainTh = (label: string) => (
    <th scope="col" className="whitespace-nowrap px-3 py-2 text-left text-sm font-semibold">
      {label}
    </th>
  );

  const field = "field !min-h-9 !py-1 text-sm";
  const statuses: (ProductStatus | "")[] = ["", ...PRODUCT_STATUSES];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter by publication status">
        {statuses.map((s) => (
          <button
            key={s || "all"}
            type="button"
            role="tab"
            aria-selected={q.status === s}
            onClick={() => set({ status: s })}
            className="min-h-9 rounded-md border border-ink/25 px-3 text-sm font-medium hover:border-brand aria-selected:border-brand aria-selected:bg-brand aria-selected:text-white"
          >
            {s ? PRODUCT_STATUS_LABEL[s] : "All"} <span className="opacity-70">({s ? data.counts[s] : data.counts.all})</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">Search</span>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name, model, manufacturer…" className={`${field} w-64`} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">Category</span>
          <select value={q.category} onChange={(e) => set({ category: e.target.value })} className={field}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.count})
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">Manufacturer</span>
          <select value={q.manufacturer} onChange={(e) => set({ manufacturer: e.target.value })} className={`${field} max-w-48`}>
            <option value="">All manufacturers</option>
            {manufacturers.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name} ({m.count})
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">Review status</span>
          <select value={q.review} onChange={(e) => set({ review: e.target.value })} className={field}>
            <option value="">Any</option>
            {REVIEW_STATUSES.map((r) => (
              <option key={r} value={r}>
                {REVIEW_STATUS_SHORT[r]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">Rows per page</span>
          <select value={q.perPage} onChange={(e) => set({ perPage: Number(e.target.value) })} className={field}>
            {[25, 50, 100, 200].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        {owner && (
          <a className={`${small} ml-auto`} href={`/api/admin/products/export?${qs({ ...q, page: 1 })}`}>
            Export CSV
          </a>
        )}
      </div>

      {owner && selected.size > 0 && (
        <div role="region" aria-label="Bulk actions" className="flex flex-wrap items-end gap-3 rounded-xl border-2 border-brand bg-sky/30 p-3">
          <p className="font-semibold">{selected.size} selected</p>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold">Set publication status</span>
            <select
              className={field}
              value=""
              onChange={(e) => {
                const s = e.target.value as ProductStatus;
                if (s && window.confirm(`Set ${selected.size} products to “${PRODUCT_STATUS_LABEL[s]}”? Moves the workflow does not allow are listed afterwards and left as they are.`)) void bulk({ type: "status", status: s }, "Status");
              }}
            >
              <option value="">Choose…</option>
              {PRODUCT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {PRODUCT_STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold">Set review status</span>
            <select className={field} value="" onChange={(e) => e.target.value && void bulk({ type: "review", review: e.target.value }, "Review status")}>
              <option value="">Choose…</option>
              {REVIEW_STATUSES.map((r) => (
                <option key={r} value={r}>
                  {REVIEW_STATUS_SHORT[r]}
                </option>
              ))}
            </select>
          </label>
          <form
            className="flex items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (bulkCategory.trim()) void bulk({ type: "category", category: bulkCategory.trim() }, "Category");
            }}
          >
            <label className="block">
              <span className="mb-1 block text-xs font-semibold">Set category</span>
              <input list="pm-categories" value={bulkCategory} onChange={(e) => setBulkCategory(e.target.value)} className={`${field} w-48`} placeholder="Category name" />
            </label>
            <button type="submit" className={small} disabled={!bulkCategory.trim()}>
              Apply
            </button>
          </form>
          <button type="button" className={small} onClick={() => void bulk({ type: "status", status: "archived" }, "Archive")}>
            Archive
          </button>
          <button
            type="button"
            className={`${small} border-ink`}
            onClick={() => {
              if (window.confirm(`Delete ${selected.size} products for good, with their comments? This cannot be undone. Archive them instead unless they were created by mistake.`)) void bulk({ type: "delete" }, "Delete");
            }}
          >
            Delete…
          </button>
          <button type="button" className="text-sm font-semibold text-brand underline underline-offset-4" onClick={() => setSelected(new Set())}>
            Clear selection
          </button>
        </div>
      )}
      <datalist id="pm-categories">{categories.map((c) => <option key={c.slug} value={c.name} />)}</datalist>

      {(error || message) && (
        <p role={error ? "alert" : "status"} className="rounded-lg border-2 border-ink p-3 font-medium">
          {error || message}
        </p>
      )}
      {failures.length > 0 && (
        <div role="alert" className="rounded-lg border border-ink/30 p-3 text-sm">
          <p className="font-semibold">Not changed:</p>
          <ul className="mt-1 list-disc pl-5">
            {failures.slice(0, 20).map((f) => (
              <li key={f.ref}>
                {f.ref}: {f.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={`overflow-x-auto rounded-xl border border-ink/10 bg-white ${loading ? "opacity-60" : ""}`} aria-busy={loading}>
        <table className="w-full min-w-[110rem] border-collapse text-sm">
          <caption className="sr-only">Products. Click a cell to edit it; press Enter to save.</caption>
          <thead className="bg-sky/30">
            <tr>
              {owner && (
                <th scope="col" className="w-10 px-3 py-2">
                  <input type="checkbox" checked={allOn} onChange={(e) => setSelected(e.target.checked ? new Set(ids) : new Set())} aria-label="Select all products on this page" />
                </th>
              )}
              {th("id", "Product ID")}
              {th("name", "Product name")}
              {th("manufacturer", "Manufacturer")}
              {th("category", "Category")}
              {th("model", "Model number")}
              {plainTh("Short description")}
              {plainTh("Technical specifications")}
              {plainTh("Product image")}
              {plainTh("Product URL")}
              {plainTh("Manufacturer URL")}
              {th("review", "Review status")}
              {th("status", "Publication status")}
              {th("created", "Created")}
              {th("updated", "Last updated")}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {data.items.length === 0 && (
              <tr>
                <td colSpan={15} className="px-3 py-8 text-center text-ink/70">
                  No products match. {data.counts.all === 0 && "The catalogue is empty: add a product, or import a file."}
                </td>
              </tr>
            )}
            {data.items.map((p) => (
              <tr key={p.id} className={selected.has(p.id) ? "bg-sky/30" : "hover:bg-sky/10"}>
                {owner && (
                <td className="px-3 py-2 align-top">
                  <input
                    type="checkbox"
                    checked={selected.has(p.id)}
                    onChange={(e) =>
                      setSelected((s) => {
                        const n = new Set(s);
                        if (e.target.checked) n.add(p.id);
                        else n.delete(p.id);
                        return n;
                      })
                    }
                    aria-label={`Select ${p.name}`}
                  />
                </td>
                )}
                <td className="whitespace-nowrap px-3 py-2 align-top">
                  <Link href={`/admin/products/${p.id}`} className="inline-flex items-center gap-1 font-semibold text-brand underline underline-offset-4" aria-label={`Open ${p.name} in the product editor`}>
                    {p.ref} <span aria-hidden="true">→</span>
                  </Link>
                </td>
                <Cell value={p.name} width="w-64" onSave={(v) => saveCell(p, "name", v)} required label="Product name" />
                <Cell value={p.manufacturer} width="w-44" onSave={(v) => saveCell(p, "manufacturer", v)} required label="Manufacturer" />
                <Cell value={p.category} width="w-48" onSave={(v) => saveCell(p, "category", v)} required label="Category" list="pm-categories" />
                <Cell value={p.modelNumber} width="w-32" onSave={(v) => saveCell(p, "modelNumber", v)} label="Model number" />
                <Cell value={p.shortDescription} width="w-72" multiline onSave={(v) => saveCell(p, "shortDescription", v)} label="Short description" />
                <td className="px-3 py-2 align-top">
                  <Link href={`/admin/products/${p.id}#specs`} className="text-brand underline underline-offset-4">
                    {p.specCount ? `${p.specCount} listed` : "None"}
                  </Link>
                </td>
                <Cell value={p.imageUrl} width="w-40" onSave={(v) => saveCell(p, "imageUrl", v)} label="Image address" render={(v) => (v ? <img src={p.thumbUrl || v} alt="" loading="lazy" className="h-10 w-14 rounded border border-ink/15 bg-white object-contain" /> : <span className="text-ink/50">None</span>)} />
                <Cell value={p.productUrl} width="w-40" onSave={(v) => saveCell(p, "productUrl", v)} label="Product URL" render={(v) => (v ? <a href={v} target="_blank" rel="noreferrer" className="block max-w-40 truncate text-brand underline underline-offset-4">{v.replace(/^https?:\/\//, "")}</a> : <span className="text-ink/50">None</span>)} />
                <Cell value={p.manufacturerUrl} width="w-40" onSave={(v) => saveCell(p, "manufacturerUrl", v)} label="Manufacturer URL" render={(v) => (v ? <a href={v} target="_blank" rel="noreferrer" className="block max-w-40 truncate text-brand underline underline-offset-4">{v.replace(/^https?:\/\//, "")}</a> : <span className="text-ink/50">None</span>)} />
                <td className="px-3 py-2 align-top">
                  <select
                    value={p.reviewStatus}
                    disabled={!owner}
                    onChange={(e) => void saveCell(p, "reviewStatus", e.target.value as ReviewStatus)}
                    className="rounded border border-ink/20 bg-white px-1.5 py-1 text-sm"
                    aria-label={`Review status of ${p.name}`}
                  >
                    {REVIEW_STATUSES.map((r) => (
                      <option key={r} value={r}>
                        {REVIEW_STATUS_SHORT[r]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2 align-top">
                  <select
                    value={p.status}
                    onChange={(e) => void setStatus(p, e.target.value as ProductStatus)}
                    className={`rounded px-1.5 py-1 text-sm font-semibold ${STATUS_STYLE[p.status]}`}
                    aria-label={`Publication status of ${p.name}`}
                  >
                    {(owner ? [p.status, ...NEXT_STATUSES[p.status]] : p.status === "draft" ? ["draft" as ProductStatus, "under_review" as ProductStatus] : [p.status]).map((s) => (
                      <option key={s} value={s}>
                        {PRODUCT_STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="whitespace-nowrap px-3 py-2 align-top text-ink/75">{dateOnly(p.createdAt)}</td>
                <td className="whitespace-nowrap px-3 py-2 align-top text-ink/75">{dateOnly(p.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/70" role="status">
          {data.total.toLocaleString("en-US")} {data.total === 1 ? "product" : "products"} · page {data.page} of {data.pageCount}
        </p>
        <div className="flex gap-2">
          <button type="button" className={small} disabled={data.page <= 1 || loading} onClick={() => setQ((x) => ({ ...x, page: data.page - 1 }))}>
            Previous
          </button>
          <button type="button" className={small} disabled={data.page >= data.pageCount || loading} onClick={() => setQ((x) => ({ ...x, page: data.page + 1 }))}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

/** One editable table cell: shows its value (or a custom rendering), turns into a field on click, saves on Enter or when left, cancels on Escape. */
function Cell({ value, onSave, width, label, multiline, required, list, render }: { value: string; onSave: (v: string) => Promise<void>; width: string; label: string; multiline?: boolean; required?: boolean; list?: string; render?: (v: string) => React.ReactNode }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [busy, setBusy] = useState(false);

  async function commit() {
    setEditing(false);
    const v = draft.trim();
    if (v === value.trim() || (required && !v)) return setDraft(value);
    setBusy(true);
    await onSave(v);
    setBusy(false);
  }

  return (
    <td className={`px-3 py-2 align-top ${width}`}>
      {editing ? (
        multiline ? (
          <textarea
            autoFocus
            value={draft}
            rows={3}
            aria-label={label}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => void commit()}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setDraft(value);
                setEditing(false);
              }
            }}
            className="field !min-h-0 w-full text-sm"
          />
        ) : (
          <input
            autoFocus
            value={draft}
            list={list}
            aria-label={label}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => void commit()}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
              if (e.key === "Escape") {
                setDraft(value);
                setEditing(false);
              }
            }}
            className="field !min-h-9 !py-1 w-full text-sm"
          />
        )
      ) : (
        <button
          type="button"
          onClick={() => {
            setDraft(value);
            setEditing(true);
          }}
          title={`Edit ${label.toLowerCase()}`}
          aria-label={`${label}: ${value || "empty"}. Click to edit.`}
          className={`block w-full rounded px-1 py-0.5 text-left hover:bg-sky/40 ${busy ? "opacity-50" : ""}`}
        >
          {render ? render(value) : value ? <span className={multiline ? "line-clamp-3" : "block truncate"}>{value}</span> : <span className="text-ink/45">—</span>}
        </button>
      )}
    </td>
  );
}
