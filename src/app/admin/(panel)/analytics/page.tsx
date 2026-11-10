import Link from "next/link";
import { ColumnApply } from "@/components/admin/ColumnApply";
import { BarList, Card, DailyChart, Empty, PageTitle, Stat } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { rangeFromDays, TABLE_COLUMNS, visitTable, type TableColumn } from "@/lib/store/analytics";
import { overview } from "@/lib/store/analytics-rollup";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const LABEL: Record<TableColumn, string> = {
  visitor: "Visitor ID", date: "Date", time: "Time", country: "Country", city: "City", page: "Page", referrer: "Referrer", source: "Source", medium: "Medium",
  campaign: "Campaign", content: "Content", term: "Term", device: "Device", browser: "Browser", landing: "Landing page", duration: "Session duration", events: "Events",
};
const DEFAULT_COLS: TableColumn[] = ["date", "time", "country", "page", "referrer", "source", "campaign", "device", "browser", "landing", "duration", "events"];
const SORTABLE = new Set<TableColumn>(["visitor", "date", "time", "country", "city", "page", "referrer", "source", "medium", "campaign", "device", "browser"]);

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requirePage({ action: "analytics.view" });
  const sp = await searchParams;
  const range = rangeFromDays(one(sp.from) || null, one(sp.to) || null);
  const colsParam = one(sp.cols).split(",").filter((c): c is TableColumn => (TABLE_COLUMNS as readonly string[]).includes(c));
  const cols = colsParam.length ? colsParam : DEFAULT_COLS;
  const q = one(sp.q).slice(0, 80);
  const country = one(sp.country).slice(0, 2);
  const device = one(sp.device);
  const source = one(sp.source).slice(0, 80);
  const sort = SORTABLE.has(one(sp.sort) as TableColumn) ? one(sp.sort) : "date";
  const dir = one(sp.dir) === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number(one(sp.page)) || 1);

  const filters = { q, country, device, source };
  const [ov, table] = await Promise.all([overview(range), visitTable({ ...range, ...filters, sort, dir, page, perPage: 25 })]);
  const { summary: sum, days: series, sources: src, countries: geo, devices: dev } = ov;

  const href = (over: Record<string, string | number | undefined>) => {
    const p = new URLSearchParams();
    const all: Record<string, string | number | undefined> = { from: range.fromDay, to: range.toDay, q, country, device, source, sort, dir, cols: colsParam.length ? cols.join(",") : "", page, ...over };
    for (const [k, v] of Object.entries(all)) if (v !== undefined && v !== "" && !(k === "page" && Number(v) <= 1)) p.set(k, String(v));
    return `/admin/analytics?${p.toString()}`;
  };
  const exportHref = `/api/admin/analytics/export?${new URLSearchParams({ from: range.fromDay, to: range.toDay, q, country, device, source, cols: cols.join(",") }).toString()}`;

  return (
    <>
      <PageTitle title="Analytics" sub="First-party, cookieless. No IP addresses are stored or shown." />

      <form method="get" className="mb-6 grid gap-3 rounded-xl border border-ink/10 bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-6">
        <label className="text-sm">
          From
          <input type="date" name="from" defaultValue={range.fromDay} className="field mt-1" />
        </label>
        <label className="text-sm">
          To
          <input type="date" name="to" defaultValue={range.toDay} className="field mt-1" />
        </label>
        <label className="text-sm lg:col-span-2">
          Search page, referrer, campaign, visitor
          <input type="search" name="q" defaultValue={q} maxLength={80} className="field mt-1" />
        </label>
        <label className="text-sm">
          Country (code)
          <input name="country" defaultValue={country} maxLength={2} placeholder="ID" className="field mt-1 uppercase" />
        </label>
        <label className="text-sm">
          Device
          <select name="device" defaultValue={device} className="field mt-1">
            <option value="">All</option>
            <option>Desktop</option>
            <option>Mobile</option>
            <option>Tablet</option>
          </select>
        </label>
        <input type="hidden" name="cols" value={cols.join(",")} />
        <div className="flex items-end gap-2 lg:col-span-6">
          <button type="submit" className="btn btn-primary btn-sm">
            Apply
          </button>
          <Link href="/admin/analytics" className="btn btn-secondary btn-sm">
            Reset
          </Link>
          <a href={exportHref} className="btn btn-secondary btn-sm ml-auto">
            Export CSV
          </a>
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Page views" value={sum.pageViews} hint="People only" />
        <Stat label="Unique visitors" value={sum.visitors} hint="Per day, summed" />
        <Stat label="Sessions" value={sum.sessions} />
        <Stat label="Article views" value={sum.articleViews} />
        <Stat
          label="Bot requests filtered"
          value={sum.botHits}
          hint={sum.pageViews + sum.botHits > 0 ? `${Math.round((sum.botHits / (sum.pageViews + sum.botHits)) * 100)}% of requests. Not in the figures above.` : "No bot requests in this range."}
        />
      </div>

      {ov.pendingDays > 0 && (
        <p role="status" className="mt-4 rounded-lg border border-dashed border-ink/25 p-3 text-sm text-ink/80">
          {ov.pendingDays} earlier day(s) of this range are still being summarised. Reload this page once to include them; the totals above are lower until then.
        </p>
      )}

      {!sum.hasData ? (
        <div className="mt-6">
          <Empty>No visits were recorded between {range.fromDay} and {range.toDay}. Nothing is estimated or filled in.</Empty>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card title="Page views per day" className="lg:col-span-3">
            <DailyChart series={series} />
          </Card>
          <Card title="Sources">
            <BarList rows={src} />
          </Card>
          <Card title="Countries">
            <BarList rows={geo} />
          </Card>
          <Card title="Devices">
            <BarList rows={dev} />
          </Card>
        </div>
      )}

      <Card title={`Visits (${table.total.toLocaleString("en-US")}${table.capped ? "+" : ""})`} className="mt-6">
        <details className="mb-4">
          <summary className="inline-flex min-h-10 cursor-pointer items-center rounded-lg border border-ink/20 px-3 text-sm font-medium">Columns</summary>
          <form method="get" className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {(["from", "to", "q", "country", "device", "source"] as const).map((k) => (
              <input key={k} type="hidden" name={k} value={k === "from" ? range.fromDay : k === "to" ? range.toDay : { q, country, device, source }[k]} />
            ))}
            <input type="hidden" name="cols" value="" />
            {TABLE_COLUMNS.map((c) => (
              <label key={c} className="inline-flex items-center gap-2">
                <input type="checkbox" value={c} defaultChecked={cols.includes(c)} data-col />
                {LABEL[c]}
              </label>
            ))}
            <noscript>
              <p className="w-full">Column choice needs JavaScript; without it the default columns are shown.</p>
            </noscript>
            <ColumnApply />
          </form>
        </details>

        <div className="max-h-[70vh] overflow-auto rounded-lg border border-ink/10" tabIndex={0} role="region" aria-label="Visits table">
          <table className="w-full min-w-max text-sm">
            <thead className="sticky top-0 z-10 bg-sky text-left">
              <tr>
                {cols.map((c) => (
                  <th key={c} scope="col" className="whitespace-nowrap px-3 py-2 font-semibold" aria-sort={sort === c ? (dir === "asc" ? "ascending" : "descending") : undefined}>
                    {SORTABLE.has(c) ? (
                      <Link href={href({ sort: c, dir: sort === c && dir === "desc" ? "asc" : "desc", page: 1 })} className="hover:text-brand">
                        {LABEL[c]} {sort === c ? (dir === "asc" ? "▲" : "▼") : ""}
                      </Link>
                    ) : (
                      LABEL[c]
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.length === 0 ? (
                <tr>
                  <td colSpan={cols.length} className="px-3 py-6 text-center text-ink/70">
                    No visits match.
                  </td>
                </tr>
              ) : (
                table.rows.map((r, i) => (
                  <tr key={i} className="border-t border-ink/10 odd:bg-white even:bg-[#f9fbfd]">
                    {cols.map((c) => (
                      <td key={c} className="max-w-[22rem] truncate whitespace-nowrap px-3 py-1.5" title={String(r[c] ?? "")}>
                        {c === "duration" ? (r.duration == null ? "—" : `${r.duration}s`) : String(r[c] ?? "") || "—"}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span>
            Page {table.page} of {table.pageCount}
            {table.capped && " · very large result: narrow the dates or add a filter for exact counts"}
          </span>
          <span className="flex gap-2">
            {table.page > 1 && (
              <Link className="btn btn-secondary btn-sm" href={href({ page: table.page - 1 })}>
                Previous
              </Link>
            )}
            {table.page < table.pageCount && (
              <Link className="btn btn-secondary btn-sm" href={href({ page: table.page + 1 })}>
                Next
              </Link>
            )}
          </span>
        </div>
      </Card>
    </>
  );
}

