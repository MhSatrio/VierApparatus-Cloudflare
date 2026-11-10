import Link from "next/link";
import type { ReactNode } from "react";

export function PageTitle({ title, children, sub }: { title: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl sm:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-ink/70">{sub}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-ink/10 bg-white p-5 shadow-card ${className}`}>
      {title && <h2 className="mb-3 text-lg">{title}</h2>}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, href }: { label: string; value: string | number; hint?: string; href?: string }) {
  const body = (
    <>
      <p className="text-sm text-ink/70">{label}</p>
      <p className="mt-1 text-3xl font-semibold">{typeof value === "number" ? value.toLocaleString("en-US") : value}</p>
      {hint && <p className="mt-1 text-xs text-ink/60">{hint}</p>}
    </>
  );
  const cls = "block rounded-xl border border-ink/10 bg-white p-5 shadow-card";
  return href ? (
    <Link href={href} className={`${cls} hover:border-brand/60`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border border-dashed border-ink/25 p-4 text-ink/70">{children}</p>;
}

/** Ranked list with proportional bars (top pages, sources, countries...). */
export function BarList({ rows, empty = "No data in this period.", format }: { rows: { label: string; count: number }[]; empty?: string; format?: (label: string) => ReactNode }) {
  if (!rows.length) return <Empty>{empty}</Empty>;
  const max = Math.max(...rows.map((r) => r.count), 1);
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate">{format ? format(r.label) : r.label}</span>
            <span className="shrink-0 font-semibold tabular-nums">{r.count.toLocaleString("en-US")}</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full bg-sky/60" aria-hidden="true">
            <div className="h-1.5 rounded-full bg-brand" style={{ width: `${Math.max(3, (r.count / max) * 100)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Daily page views as an SVG bar chart with a text alternative. No chart library. */
export function DailyChart({ series }: { series: { day: string; pageViews: number; visitors: number }[] }) {
  const max = Math.max(...series.map((d) => d.pageViews), 1);
  const w = 720;
  const h = 160;
  const bw = w / Math.max(series.length, 1);
  const total = series.reduce((a, d) => a + d.pageViews, 0);
  return (
    <figure>
      <svg viewBox={`0 0 ${w} ${h + 22}`} className="w-full" role="img" aria-label={`Page views per day from ${series[0]?.day} to ${series.at(-1)?.day}, ${total} in total, highest day ${max}.`}>
        <title>Page views per day</title>
        {series.map((d, i) => {
          const bh = Math.max(d.pageViews ? 2 : 0, (d.pageViews / max) * h);
          return (
            <rect key={d.day} x={i * bw + 1} y={h - bh} width={Math.max(bw - 2, 1)} height={bh} rx={2} fill="#4570B6">
              <title>{`${d.day}: ${d.pageViews} page views, ${d.visitors} visitors`}</title>
            </rect>
          );
        })}
        <line x1="0" x2={w} y1={h} y2={h} stroke="#231F20" strokeOpacity="0.2" />
        <text x="0" y={h + 16} fontSize="12" fill="#231F20" fillOpacity="0.7">
          {series[0]?.day}
        </text>
        <text x={w} y={h + 16} fontSize="12" textAnchor="end" fill="#231F20" fillOpacity="0.7">
          {series.at(-1)?.day}
        </text>
        <text x="0" y="12" fontSize="12" fill="#231F20" fillOpacity="0.7">
          peak {max} per day
        </text>
      </svg>
    </figure>
  );
}

export const statusStyle: Record<string, string> = {
  draft: "bg-sky text-ink",
  published: "bg-brand text-white",
  archived: "bg-ink/10 text-ink",
  pending: "bg-sky text-ink",
  accepted: "bg-brand text-white",
  rejected: "bg-ink/10 text-ink",
  revision: "bg-sky text-ink",
  new: "bg-brand text-white",
  read: "bg-ink/10 text-ink",
};

export function Badge({ status, children }: { status: string; children?: ReactNode }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyle[status] ?? "bg-ink/10"}`}>{children ?? status}</span>;
}

export const dateTime = (iso: string | null) =>
  iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " UTC" : "—";
export const dateOnly = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "—");
