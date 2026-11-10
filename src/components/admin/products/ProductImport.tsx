"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { columnByKey, IMPORT_COLUMNS, MAX_IMPORT_ROWS, parseTable, suggestMapping, toRecords, type ParsedTable } from "@/lib/products/table";
import type { ImportSummary } from "@/lib/products/import";
import type { ImportHistoryItem } from "@/lib/store/products";
import { apiMessage, useApi } from "../AdminProvider";
import { dateTime } from "../ui";
import { Card } from "../ui";

type Source = "csv" | "paste";
const REQUIRED = IMPORT_COLUMNS.filter((c) => c.required).map((c) => c.key);
const ACTION_LABEL = { add: "Add", update: "Update", duplicate: "Duplicate", error: "Error" } as const;
const ACTION_STYLE = { add: "bg-brand text-white", update: "bg-sky text-ink", duplicate: "bg-ink/15 text-ink", error: "bg-ink text-white" } as const;

/**
 * Import products from a CSV file or from cells copied out of Excel or Google Sheets. Four steps: choose the data, match its columns,
 * CHECK it (nothing is written; every row comes back as add, update, duplicate or error), then import. No row is skipped silently.
 */
export function ProductImport({ history }: { history: ImportHistoryItem[] }) {
  const api = useApi();
  const [source, setSource] = useState<Source>("csv");
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [table, setTable] = useState<ParsedTable | null>(null);
  const [mapping, setMapping] = useState<(string | null)[]>([]);
  const [onDuplicate, setOnDuplicate] = useState<"skip" | "update">("skip");
  const [preview, setPreview] = useState<ImportSummary | null>(null);
  const [result, setResult] = useState<ImportSummary | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [onlyProblems, setOnlyProblems] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const mapped = useMemo(() => new Set(mapping.filter(Boolean)), [mapping]);
  const missing = REQUIRED.filter((k) => !mapped.has(k));
  const records = useMemo(() => (table ? toRecords(table.rows, mapping) : []), [table, mapping]);

  function read(value: string, from: Source, name = "") {
    setSource(from);
    setText(value);
    setFileName(name);
    setPreview(null);
    setResult(null);
    setError("");
    if (!value.trim()) return setTable(null);
    const t = parseTable(value);
    setTable(t);
    setMapping(suggestMapping(t.headers));
    if (t.headers.length < 2) setError("This does not look like a table. Copy at least a header row and one product row, including the header cells.");
  }

  async function run(mode: "preview" | "commit") {
    setBusy(true);
    setError("");
    const r = await api.post<ImportSummary>("/api/admin/products/import", { mode, onDuplicate, filename: fileName, source, records });
    setBusy(false);
    if (!r.ok) return setError(apiMessage(r));
    if (mode === "preview") setPreview(r.data);
    else {
      setResult(r.data);
      setPreview(null);
    }
  }

  const reset = () => {
    setText("");
    setTable(null);
    setPreview(null);
    setResult(null);
    setFileName("");
    setError("");
    if (fileInput.current) fileInput.current.value = "";
  };

  const summary = result ?? preview;
  const rows = summary ? (onlyProblems ? summary.rows.filter((r) => r.action === "error" || r.action === "duplicate" || r.warnings.length) : summary.rows) : [];

  return (
    <div className="space-y-6">
      <Card title="1. The template">
        <p className="text-sm text-ink/80">
          Start from the template. It opens in Excel and Google Sheets, has the column headers, a line saying which columns are required, the expected format of each, and example rows (marked #EXAMPLE and ignored on import). You can also export
          the table from the Product Manager, edit it, and import it back to update those products.
        </p>
        <p className="mt-4 flex flex-wrap gap-3">
          <a href="/templates/product-import-template.csv" download className="btn btn-secondary btn-sm">
            Download the template (.csv)
          </a>
          <Link href="/admin/products" className="btn btn-secondary btn-sm">
            Back to the table
          </Link>
        </p>
      </Card>

      {result ? (
        <Card title="Import finished">
          <dl className="grid gap-4 sm:grid-cols-5">
            {[
              ["Rows", result.total],
              ["Added", result.added],
              ["Updated", result.updated],
              ["Left out as duplicates", result.skipped],
              ["Failed", result.failed],
            ].map(([k, v]) => (
              <div key={k as string}>
                <dt className="text-sm text-ink/70">{k}</dt>
                <dd className="text-2xl font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          {result.newCategories.length > 0 && <p className="mt-3 text-sm">New categories created: {result.newCategories.join(", ")}.</p>}
          <p className="mt-4 flex gap-3">
            <Link href="/admin/products" className="btn btn-primary btn-sm">
              See the products
            </Link>
            <button type="button" className="btn btn-secondary btn-sm" onClick={reset}>
              Import another file
            </button>
          </p>
        </Card>
      ) : (
        <>
          <Card title="2. Choose the data">
            <div className="flex gap-2" role="tablist" aria-label="Where the data comes from">
              {([["csv", "Upload a CSV file"], ["paste", "Paste from a spreadsheet"]] as const).map(([k, label]) => (
                <button key={k} type="button" role="tab" aria-selected={source === k} onClick={() => setSource(k)} className="min-h-9 rounded-md border border-ink/25 px-3 text-sm font-medium hover:border-brand aria-selected:border-brand aria-selected:bg-brand aria-selected:text-white">
                  {label}
                </button>
              ))}
            </div>
            {source === "csv" ? (
              <div className="mt-4">
                <input
                  ref={fileInput}
                  type="file"
                  accept=".csv,.tsv,.txt,text/csv,text/plain"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    if (f.size > 8_000_000) return setError("That file is larger than 8 MB.");
                    read(await f.text(), "csv", f.name);
                  }}
                  className="field py-2"
                  aria-label="CSV file"
                />
                <p className="mt-2 text-sm text-ink/70">Comma, semicolon or tab separated; UTF-8. Up to {MAX_IMPORT_ROWS.toLocaleString("en-US")} rows at a time.</p>
              </div>
            ) : (
              <div className="mt-4">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium">Paste the cells, including the header row</span>
                  <textarea value={text} onChange={(e) => read(e.target.value, "paste")} rows={8} spellCheck={false} className="field font-mono text-sm" placeholder={"name\tmanufacturer\tcategory\nProduct A\tMaker\tCentrifuges"} />
                </label>
                <p className="mt-2 text-sm text-ink/70">Select the cells in Excel or Google Sheets, copy, and paste here. Tab-separated and comma-separated text both work.</p>
              </div>
            )}
            {error && (
              <p role="alert" className="mt-3 rounded-lg border-2 border-ink p-3 font-medium">
                {error}
              </p>
            )}
          </Card>

          {table && table.headers.length > 1 && (
            <Card title="3. Match the columns">
              <p className="text-sm text-ink/80">
                {table.rows.length.toLocaleString("en-US")} rows found{table.skipped ? `, ${table.skipped} comment lines ignored` : ""}
                {table.tooMany ? `. Only the first ${MAX_IMPORT_ROWS.toLocaleString("en-US")} rows will be used: import the rest in another file` : ""}. Each column of your file is matched to a column of the Product Manager; change any that are wrong, or ignore a column.
              </p>
              {missing.length > 0 && (
                <p role="alert" className="mt-3 rounded-lg border-2 border-ink p-3 text-sm font-medium">
                  These required columns are not matched yet: {missing.join(", ")}.
                </p>
              )}
              <div className="mt-4 overflow-x-auto rounded-lg border border-ink/10">
                <table className="w-full min-w-[40rem] text-sm">
                  <thead className="bg-sky/30 text-left">
                    <tr>
                      <th className="px-3 py-2">Column in your file</th>
                      <th className="px-3 py-2">Imported as</th>
                      <th className="px-3 py-2">First values</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {table.headers.map((h, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 font-medium">{h || <span className="text-ink/50">(no header)</span>}</td>
                        <td className="px-3 py-2">
                          <select
                            value={mapping[i] ?? ""}
                            onChange={(e) => {
                              const v = e.target.value || null;
                              setMapping((m) => m.map((x, k) => (k === i ? v : v && x === v ? null : x)));
                              setPreview(null);
                            }}
                            aria-label={`What to import column ${h || i + 1} as`}
                            className="rounded border border-ink/25 bg-white px-2 py-1"
                          >
                            <option value="">— ignore this column —</option>
                            {IMPORT_COLUMNS.map((c) => (
                              <option key={c.key} value={c.key}>
                                {c.header}
                                {c.required ? " (required)" : ""}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="max-w-[24rem] truncate px-3 py-2 text-ink/70">{table.rows.slice(0, 3).map((r) => r[i] ?? "").filter(Boolean).join(" · ").slice(0, 120)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <fieldset className="mt-4">
                <legend className="font-medium">When a row is the same product as one already in the catalogue (same manufacturer and model) but does not give its Product ID</legend>
                <div className="mt-2 flex flex-wrap gap-6">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="dup" checked={onDuplicate === "skip"} onChange={() => { setOnDuplicate("skip"); setPreview(null); }} /> Leave the existing product unchanged (reported as a duplicate)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="dup" checked={onDuplicate === "update"} onChange={() => { setOnDuplicate("update"); setPreview(null); }} /> Update it with the cells that are filled in
                  </label>
                </div>
              </fieldset>
              <p className="mt-5">
                <button type="button" className="btn btn-primary btn-sm" disabled={busy || missing.length > 0 || records.length === 0} onClick={() => void run("preview")}>
                  {busy && !preview ? "Checking…" : "Check the file (nothing is saved)"}
                </button>
              </p>
            </Card>
          )}

          {preview && (
            <Card title="4. Check, then import">
              <dl className="grid gap-4 sm:grid-cols-5">
                {[
                  ["Rows", preview.total],
                  ["Will be added", preview.added],
                  ["Will be updated", preview.updated],
                  ["Duplicates left out", preview.skipped],
                  ["Cannot be imported", preview.failed],
                ].map(([k, v]) => (
                  <div key={k as string}>
                    <dt className="text-sm text-ink/70">{k}</dt>
                    <dd className="text-2xl font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              {preview.newCategories.length > 0 && <p className="mt-3 text-sm">New categories that will be created: {preview.newCategories.join(", ")}.</p>}
              {preview.failed > 0 && <p className="mt-3 text-sm font-medium">Rows that cannot be imported are listed below with the reason. They will not be imported; fix them in your file and import again, or import the rest now.</p>}
              <p className="mt-4 flex flex-wrap items-center gap-3">
                <button type="button" className="btn btn-primary btn-sm" disabled={busy || preview.added + preview.updated === 0} onClick={() => void run("commit")}>
                  {busy ? "Importing…" : `Import ${preview.added + preview.updated} products`}
                </button>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={onlyProblems} onChange={(e) => setOnlyProblems(e.target.checked)} /> Show only rows with a problem or a note
                </label>
              </p>
            </Card>
          )}
        </>
      )}

      {summary && (
        <Card title={result ? "What happened to each row" : "What each row will do"}>
          <div className="max-h-[32rem] overflow-auto rounded-lg border border-ink/10">
            <table className="w-full min-w-[40rem] text-sm">
              <thead className="sticky top-0 bg-sky/40 text-left">
                <tr>
                  <th className="px-3 py-2">Row</th>
                  <th className="px-3 py-2">Product</th>
                  <th className="px-3 py-2">Result</th>
                  <th className="px-3 py-2">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-3 py-6 text-center text-ink/70">
                      No row has a problem or a note.
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r.row}>
                    <td className="px-3 py-2 align-top">{r.row}</td>
                    <td className="max-w-[18rem] truncate px-3 py-2 align-top">{r.name}</td>
                    <td className="px-3 py-2 align-top">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${ACTION_STYLE[r.action]}`}>{ACTION_LABEL[r.action]}</span>
                    </td>
                    <td className="px-3 py-2 align-top">
                      {[...r.errors, ...(r.note ? [r.note] : []), ...r.warnings].map((m, i) => (
                        <p key={i} className={r.errors.includes(m) ? "font-medium" : "text-ink/75"}>
                          {m}
                        </p>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card title="Earlier imports">
        {history.length === 0 ? (
          <p className="text-sm text-ink/70">Nothing has been imported through this page yet.</p>
        ) : (
          <ul className="divide-y divide-ink/10 text-sm">
            {history.map((h) => (
              <li key={h.id} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-2">
                <span className="font-medium">{dateTime(h.at)}</span>
                <span>{h.actorName}</span>
                <span className="text-ink/70">{h.filename || (h.source === "paste" ? "pasted data" : "file")}</span>
                <span>
                  {h.total} rows: {h.added} added, {h.updated} updated, {h.skipped} duplicates, {h.failed} failed
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <p className="text-xs text-ink/60">Columns: {IMPORT_COLUMNS.map((c) => columnByKey.get(c.key)!.header).join(", ")}.</p>
    </div>
  );
}
