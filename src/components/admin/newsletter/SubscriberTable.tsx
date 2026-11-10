"use client";

import { useEffect, useRef, useState } from "react";
import { parseCsv } from "@/lib/csv";
import { apiMessage, useApi } from "../AdminProvider";
import { Dialog, Field, inputCls } from "../Dialog";

export type SubRow = { id: string; email: string; name: string; interests: string[]; status: "pending" | "active" | "unsubscribed"; source: string; createdAt: string; confirmedAt: string | null; consentAt: string | null };
type Counts = { pending: number; active: number; unsubscribed: number };
type Sort = "email" | "name" | "status" | "created";

const cell = "border border-ink/10 px-2.5 py-1.5 align-top";
const STATUS_LABEL: Record<SubRow["status"], string> = { pending: "Waiting for confirmation", active: "Active", unsubscribed: "Unsubscribed" };
const STATUS_CLASS: Record<SubRow["status"], string> = { pending: "bg-sky text-ink", active: "bg-brand text-white", unsubscribed: "bg-ink/10 text-ink" };
const day = (iso: string | null) => (iso ? iso.slice(0, 10) : "—");

/**
 * The subscriber table, built like the Article Planner table: sticky header, sortable columns, search and filters, a detail
 * dialog for each person, plus export and an import that checks the file before anything is saved.
 */
export function SubscriberTable({ topics }: { topics: string[] }) {
  const api = useApi();
  const [items, setItems] = useState<SubRow[]>([]);
  const [counts, setCounts] = useState<Counts>({ pending: 0, active: 0, unsubscribed: 0 });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [interest, setInterest] = useState("");
  const [sort, setSort] = useState<Sort>("created");
  const [dir, setDir] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [detail, setDetail] = useState<SubRow | null>(null);
  const [importing, setImporting] = useState(false);
  const firstLoad = useRef(true);

  async function load() {
    setLoading(true);
    const qs = new URLSearchParams({ q, status, interest, sort, dir, page: String(page) });
    const r = await api.get<{ items?: SubRow[]; total?: number; counts?: Counts; pageCount?: number }>(`/api/admin/subscribers?${qs}`);
    setLoading(false);
    if (!r.ok) return setMsg(apiMessage(r));
    setItems(r.data.items ?? []);
    setTotal(r.data.total ?? 0);
    setCounts(r.data.counts ?? { pending: 0, active: 0, unsubscribed: 0 });
    setPageCount(r.data.pageCount ?? 1);
  }

  // Search is debounced a little, so typing does not send a request per letter.
  useEffect(() => {
    const t = window.setTimeout(
      () => {
        firstLoad.current = false;
        void load();
      },
      firstLoad.current ? 0 : 250,
    );
    return () => window.clearTimeout(t);
    // load reads the current filter state; the dependencies below are exactly those inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status, interest, sort, dir, page]);

  const sortBy = (k: Sort) => {
    setPage(1);
    if (sort === k) setDir(dir === "asc" ? "desc" : "asc");
    else {
      setSort(k);
      setDir(k === "created" ? "desc" : "asc");
    }
  };
  const mark = (k: Sort) => (sort === k ? (dir === "asc" ? " ▲" : " ▼") : "");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-brand px-3 py-1 font-semibold text-white">Active {counts.active}</span>
        <span className="rounded-full bg-sky px-3 py-1 font-semibold">Waiting for confirmation {counts.pending}</span>
        <span className="rounded-full bg-ink/10 px-3 py-1 font-semibold">Unsubscribed {counts.unsubscribed}</span>
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-xl border border-ink/10 bg-white p-3 shadow-card">
        <label className="text-sm">
          <span className="sr-only">Search subscribers</span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setPage(1);
              setQ(e.target.value);
            }}
            placeholder="Search e-mail or name"
            className="field !min-h-9 w-56"
            maxLength={80}
          />
        </label>
        <label className="text-sm">
          <span className="sr-only">Status</span>
          <select value={status} onChange={(e) => (setPage(1), setStatus(e.target.value))} className="field !min-h-9">
            <option value="">Any status</option>
            <option value="active">Active</option>
            <option value="pending">Waiting for confirmation</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="sr-only">Interest</span>
          <select value={interest} onChange={(e) => (setPage(1), setInterest(e.target.value))} className="field !min-h-9">
            <option value="">Any interest</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="inline-flex min-h-9 items-center rounded-md border border-ink/25 px-2.5 text-sm font-medium hover:border-brand hover:text-brand" onClick={() => (setQ(""), setStatus(""), setInterest(""), setPage(1))}>
          Clear
        </button>
        <div className="ml-auto flex flex-wrap gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setImporting(true)}>
            Import CSV
          </button>
          <a href="/api/admin/subscribers/export" className="btn btn-secondary btn-sm" download>
            Export CSV
          </a>
        </div>
      </div>

      {msg && (
        <p role="status" className="rounded-lg border-2 border-ink p-2.5 text-sm font-medium">
          {msg}
        </p>
      )}

      <div className="overflow-auto rounded-xl border border-ink/10 bg-white shadow-card" style={{ maxHeight: "70vh" }} role="region" aria-label="Subscribers table" tabIndex={0}>
        <table className="w-full min-w-[56rem] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-[#cfe7f8] text-left">
            <tr>
              {(
                [
                  ["email", "E-mail"],
                  ["name", "Name"],
                  [null, "Interests"],
                  ["status", "Status"],
                  [null, "Source"],
                  ["created", "Subscribed"],
                  [null, "Confirmed"],
                ] as [Sort | null, string][]
              ).map(([k, label]) => (
                <th key={label} scope="col" className={`${cell} whitespace-nowrap font-semibold`}>
                  {k ? (
                    <button type="button" onClick={() => sortBy(k)} className="font-semibold hover:text-brand">
                      {label}
                      {mark(k)}
                    </button>
                  ) : (
                    label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-ink/70">
                  {loading ? "Loading…" : total === 0 && !q && !status && !interest ? "No subscribers yet. The popup or the subscribe form adds people; you can also import a CSV." : "No subscribers match these filters."}
                </td>
              </tr>
            )}
            {items.map((s) => (
              <tr key={s.id} onClick={() => setDetail(s)} className="cursor-pointer odd:bg-white even:bg-[#f9fbfd] hover:bg-sky/40">
                <td className={`${cell} font-medium`}>
                  <button type="button" className="text-left text-brand underline underline-offset-4" onClick={(e) => (e.stopPropagation(), setDetail(s))}>
                    {s.email}
                  </button>
                </td>
                <td className={cell}>{s.name || <span className="text-ink/40">—</span>}</td>
                <td className={cell}>{s.interests.length ? s.interests.join(", ") : <span className="text-ink/40">—</span>}</td>
                <td className={cell}>
                  <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLASS[s.status]}`}>{STATUS_LABEL[s.status]}</span>
                </td>
                <td className={`${cell} whitespace-nowrap`}>{s.source}</td>
                <td className={`${cell} whitespace-nowrap`}>{day(s.createdAt)}</td>
                <td className={`${cell} whitespace-nowrap`}>{day(s.confirmedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span>
          {total.toLocaleString("en-US")} subscriber{total === 1 ? "" : "s"} · page {page} of {pageCount}
        </span>
        <span className="flex gap-2">
          <button type="button" className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button type="button" className="btn btn-secondary btn-sm" disabled={page >= pageCount} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </span>
      </div>

      {detail && <DetailDialog sub={detail} topics={topics} onClose={() => setDetail(null)} onChanged={() => (setDetail(null), void load())} />}
      {importing && <ImportDialog onClose={() => setImporting(false)} onDone={() => (setImporting(false), void load())} />}
    </div>
  );
}

function DetailDialog({ sub, topics, onClose, onChanged }: { sub: SubRow; topics: string[]; onClose: () => void; onChanged: () => void }) {
  const api = useApi();
  const [name, setName] = useState(sub.name);
  const [status, setStatus] = useState<SubRow["status"]>(sub.status);
  const [picked, setPicked] = useState<string[]>(sub.interests);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [asking, setAsking] = useState(false);
  const extra = sub.interests.filter((i) => !topics.includes(i)); // labels from older topics are kept, not lost

  return (
    <Dialog open onClose={onClose} title={sub.email} wide>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setErr("");
          const r = await api.put(`/api/admin/subscribers/${sub.id}`, { name, interests: picked, status });
          setBusy(false);
          if (!r.ok) return setErr(apiMessage(r));
          onChanged();
        }}
      >
        <dl className="grid gap-2 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-ink/60">Subscribed</dt>
            <dd>{day(sub.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-ink/60">Confirmed</dt>
            <dd>{day(sub.confirmedAt)}</dd>
          </div>
          <div>
            <dt className="text-ink/60">Source</dt>
            <dd>{sub.source}</dd>
          </div>
        </dl>
        <Field label="Name">
          <input value={name} maxLength={80} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>
        <fieldset className="text-sm">
          <legend className="font-medium">Interests</legend>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
            {[...topics, ...extra].map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input type="checkbox" checked={picked.includes(t)} onChange={(e) => setPicked(e.target.checked ? [...picked, t] : picked.filter((x) => x !== t))} />
                {t}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Status" hint="Only active subscribers receive newsletters. Switching to Unsubscribed stops all mail to this person.">
          <select value={status} onChange={(e) => setStatus(e.target.value as SubRow["status"])} className={inputCls}>
            <option value="active">Active</option>
            <option value="pending">Waiting for confirmation</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </Field>
        {err && (
          <p role="alert" className="font-semibold">
            {err}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>
            {asking ? (
              <span className="flex items-center gap-2 text-sm">
                Delete this person from the list?
                <button
                  type="button"
                  className="font-semibold text-brand underline underline-offset-4"
                  onClick={async () => {
                    setBusy(true);
                    const r = await api.del(`/api/admin/subscribers/${sub.id}`);
                    setBusy(false);
                    if (!r.ok) return setErr(apiMessage(r));
                    onChanged();
                  }}
                >
                  Yes, delete
                </button>
                <button type="button" className="underline underline-offset-4" onClick={() => setAsking(false)}>
                  Keep
                </button>
              </span>
            ) : (
              <button type="button" className="text-sm font-semibold text-brand underline underline-offset-4" onClick={() => setAsking(true)}>
                Delete this person
              </button>
            )}
          </span>
          <span className="flex gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={busy}>
              Save
            </button>
          </span>
        </div>
      </form>
    </Dialog>
  );
}

type Parsed = { rows: { email: string; name: string; interests: string[] }[]; problems: string[]; headerFound: boolean };

/** Reads the CSV in the browser: needs a header row with an e-mail column; name and interests (separated by ";") are optional. */
function parseImport(text: string): Parsed {
  const grid = parseCsv(text);
  if (grid.length < 2) return { rows: [], problems: ["The file needs a header row and at least one person."], headerFound: false };
  const head = grid[0].map((h) => h.trim().toLowerCase());
  const emailCol = head.findIndex((h) => h === "email" || h === "e-mail" || h === "mail");
  if (emailCol < 0) return { rows: [], problems: ["The first row must name an e-mail column (email)."], headerFound: false };
  const nameCol = head.findIndex((h) => h === "name" || h === "full name");
  const interestCol = head.findIndex((h) => h === "interests" || h === "interest");
  const rows: Parsed["rows"] = [];
  const problems: string[] = [];
  grid.slice(1).forEach((r, i) => {
    const email = (r[emailCol] ?? "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return void problems.push(`Line ${i + 2}: "${r[emailCol] ?? ""}" is not an e-mail address`);
    rows.push({
      email,
      name: nameCol >= 0 ? (r[nameCol] ?? "").trim() : "",
      interests: interestCol >= 0 ? (r[interestCol] ?? "").split(";").map((x) => x.trim()).filter(Boolean) : [],
    });
  });
  return { rows, problems, headerFound: true };
}

function ImportDialog({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const api = useApi();
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState<Parsed | null>(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<{ created: number; alreadyListed: number; invalid: number; duplicatesInFile: number } | null>(null);
  const [err, setErr] = useState("");

  async function run() {
    if (!parsed) return;
    setBusy(true);
    setErr("");
    let created = 0;
    let alreadyListed = 0;
    let invalid = 0;
    let duplicatesInFile = 0;
    const chunk = 500;
    for (let i = 0; i < parsed.rows.length; i += chunk) {
      setProgress(`Saving ${Math.min(i + chunk, parsed.rows.length)} of ${parsed.rows.length}…`);
      const r = await api.post<{ created?: number; alreadyListed?: number; invalid?: unknown[]; duplicatesInFile?: number }>("/api/admin/subscribers/import", { consentConfirmed: true, rows: parsed.rows.slice(i, i + chunk) });
      if (!r.ok) {
        setBusy(false);
        setProgress("");
        return setErr(apiMessage(r));
      }
      created += r.data.created ?? 0;
      alreadyListed += r.data.alreadyListed ?? 0;
      invalid += r.data.invalid?.length ?? 0;
      duplicatesInFile += r.data.duplicatesInFile ?? 0;
    }
    setBusy(false);
    setProgress("");
    setResult({ created, alreadyListed, invalid, duplicatesInFile });
  }

  return (
    <Dialog open onClose={onClose} title="Import subscribers from CSV" wide>
      {result ? (
        <div className="space-y-4">
          <p className="text-base">
            <strong>{result.created}</strong> added (they wait for confirmation). <strong>{result.alreadyListed}</strong> were already on the list and were not changed.{" "}
            {result.duplicatesInFile > 0 && <>{result.duplicatesInFile} repeated in the file. </>}
            {result.invalid > 0 && <>{result.invalid} line(s) skipped as invalid.</>}
          </p>
          <p className="text-sm text-ink/70">
            Imported people are saved as <strong>Waiting for confirmation</strong>. They receive nothing, and they cannot become active yet: the invitation e-mail that lets them confirm is not built yet. Newsletter sending is not built yet either.
          </p>
          <div className="flex justify-end">
            <button type="button" className="btn btn-primary btn-sm" onClick={onDone}>
              Done
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-ink/80">
            A CSV file with a header row. Columns: <code>email</code> (required), <code>name</code>, <code>interests</code> (topics separated by semicolons). Excel: save as CSV first.
          </p>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const t = await f.text();
              setText(t);
              setParsed(parseImport(t));
            }}
            className="text-sm"
          />
          <Field label="…or paste the CSV text">
            <textarea
              value={text}
              rows={5}
              onChange={(e) => {
                setText(e.target.value);
                setParsed(e.target.value.trim() ? parseImport(e.target.value) : null);
              }}
              className={inputCls}
              placeholder={"email,name,interests\nreader@example.org,Ada,Microbiology; Biochemistry"}
            />
          </Field>
          {parsed && (
            <div className="rounded-lg border border-ink/15 p-3 text-sm">
              <p>
                <strong>{parsed.rows.length}</strong> valid {parsed.rows.length === 1 ? "person" : "people"} ready to import
                {parsed.problems.length > 0 && <>, {parsed.problems.length} line(s) will be skipped</>}.
              </p>
              {parsed.problems.length > 0 && (
                <ul className="mt-2 list-disc pl-5">
                  {parsed.problems.slice(0, 6).map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
            <span>I confirm that these people agreed to receive e-mails from VierApparatus, or that I have a legitimate reason to contact them about the newsletter.</span>
          </label>
          {err && (
            <p role="alert" className="font-semibold">
              {err}
            </p>
          )}
          {progress && <p role="status" className="text-sm">{progress}</p>}
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary btn-sm" disabled={busy || !parsed || parsed.rows.length === 0 || !consent} onClick={run}>
              Import {parsed?.rows.length ?? 0}
            </button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
