import Link from "next/link";
import { ArticleActions } from "@/components/admin/ArticleActions";
import { Badge, Card, dateOnly, Empty, PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { countByStatus, listForAdmin, listRecentlyPublished, type ArticleStatus } from "@/lib/store/articles";
import { site } from "@/lib/site";
import { CopyLinks } from "@/components/admin/CopyLinks";
import { CopyText } from "@/components/admin/CopyText";
import { RefCheckSelect } from "@/components/admin/refcheck/RefCheckSelect";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ArticlesAdminPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { user } = await requirePage({ action: "articles.write" });
  const owner = can(user, "articles.manage");
  const sp = await searchParams;
  const status = (["draft", "published", "archived"] as const).find((s) => s === one(sp.status)) as ArticleStatus | undefined;
  const q = one(sp.q).slice(0, 80);
  const review = one(sp.review) === "1";
  const page = Math.max(1, Number(one(sp.page)) || 1);

  const [list, counts, recent] = await Promise.all([
    listForAdmin({ status, q, page, involvedUserId: owner ? undefined : user.id, review, perPage: 25 }),
    owner ? countByStatus() : Promise.resolve(null),
    owner ? listRecentlyPublished(30) : Promise.resolve([]),
  ]);
  const link = (over: Record<string, string>) => {
    const p = new URLSearchParams({ ...(status ? { status } : {}), ...(q ? { q } : {}), ...(review ? { review: "1" } : {}), ...over });
    for (const [k, v] of [...p]) if (!v) p.delete(k);
    return `/admin/articles${p.size ? `?${p}` : ""}`;
  };
  const tab = (label: string, over: Record<string, string>, on: boolean, n?: number) => (
    <Link key={label} href={link({ page: "", ...over })} aria-current={on ? "page" : undefined} className="rounded-full border border-ink/20 px-3 py-1.5 text-sm font-medium hover:border-brand aria-[current=page]:border-brand aria-[current=page]:bg-brand aria-[current=page]:text-white">
      {label}
      {n != null && <span className="ml-1 opacity-70">{n}</span>}
    </Link>
  );

  return (
    <>
      <PageTitle title="Article Management" sub={owner ? "Every article: who is writing it, who last edited it, and where it is in review. Only you publish." : "Articles you wrote or that were assigned to you."}>
        <Link href="/admin/articles/new?tab=markdown" className="btn btn-secondary btn-sm">
          Import Markdown
        </Link>
        <Link href="/admin/articles/new" className="btn btn-primary btn-sm">
          New article
        </Link>
      </PageTitle>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {tab("All", { status: "", review: "" }, !status && !review)}
        {tab("Drafts", { status: "draft", review: "" }, status === "draft" && !review, counts?.draft)}
        {owner && tab("Needs review", { status: "draft", review: "1" }, review, counts?.review)}
        {tab("Published", { status: "published", review: "" }, status === "published", counts?.published)}
        {tab("Archived", { status: "archived", review: "" }, status === "archived", counts?.archived)}
        <form method="get" role="search" className="ml-auto flex gap-2">
          {status && <input type="hidden" name="status" value={status} />}
          <label className="sr-only" htmlFor="q">
            Search articles
          </label>
          <input id="q" name="q" type="search" defaultValue={q} placeholder="Search title, address or Article ID" className="field !min-h-10 w-56" />
          <button type="submit" className="btn btn-secondary btn-sm">
            Search
          </button>
        </form>
      </div>

      <Card className="!p-0">
        {list.items.length === 0 ? (
          <div className="p-5">
            <Empty>{q || status ? "No articles match." : "No articles yet. Create the first one."}</Empty>
          </div>
        ) : (
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Articles table">
            <table className="w-full min-w-[80rem] text-sm">
              <thead className="bg-sky text-left">
                <tr>
                  {["Title", "Category", "Author", "Assigned to", "Last edited by", "Status", "Review", "Reference check", "Updated", "Published", "Actions"].map((h) => (
                    <th key={h} scope="col" className="px-3 py-2 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.items.map((a) => (
                  <tr key={a.id} className="border-t border-ink/10 align-top odd:bg-white even:bg-[#f9fbfd]">
                    <td className="max-w-[20rem] px-3 py-2">
                      <Link href={`/admin/articles/${a.id}`} className="font-medium hover:text-brand">
                        {a.title}
                      </Link>
                      <div className="truncate text-xs text-ink/60">/{a.slug}</div>
                      <div className="mt-1 text-xs text-ink/70">
                        <span className="mr-1.5 font-semibold">Article ID</span>
                        <CopyText value={a.id} label="Copy ID" />
                      </div>
                    </td>
                    <td className="px-3 py-2">{a.categoryName ?? "—"}</td>
                    <td className="px-3 py-2">{a.authorName}</td>
                    <td className="px-3 py-2">{a.assignedToName ?? "—"}</td>
                    <td className="px-3 py-2">{a.lastEditorName || "—"}</td>
                    <td className="px-3 py-2">
                      <Badge status={a.status} />
                    </td>
                    <td className="px-3 py-2">
                      {a.status !== "draft" || a.reviewStatus === "none" ? (
                        "—"
                      ) : (
                        <span className="text-xs font-semibold">{a.reviewStatus === "requested" ? "Awaiting review" : a.reviewStatus === "revision" ? "Revision requested" : "Approved"}</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <RefCheckSelect entity="article" id={a.id} status={a.refcheckStatus} label={a.title} />
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">{dateOnly(a.updatedAt)}</td>
                    <td className="whitespace-nowrap px-3 py-2">{dateOnly(a.publishedAt)}</td>
                    <td className="px-3 py-2">
                      <ArticleActions id={a.id} slug={a.slug} title={a.title} status={a.status} owner={owner} review={a.reviewStatus} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {owner && recent.length > 0 && (
        <details className="mt-6 rounded-xl border border-ink/10 bg-white p-4 shadow-card">
          <summary className="cursor-pointer font-semibold">Links of articles published or updated in the last 30 days ({recent.length})</summary>
          <p className="mt-2 text-sm text-ink/70">Copy them in one go, for example to share a batch of new articles. Search engines that support IndexNow are notified automatically when you publish on the live domain.</p>
          <CopyLinks links={recent.map((r) => `${site.url}/articles/${r.slug}`)} />
        </details>
      )}

      {list.pageCount > 1 && (
        <p className="mt-4 flex items-center justify-between text-sm">
          <span>
            Page {list.page} of {list.pageCount} · {list.total} articles
          </span>
          <span className="flex gap-2">
            {list.page > 1 && (
              <Link className="btn btn-secondary btn-sm" href={link({ page: String(list.page - 1) })}>
                Previous
              </Link>
            )}
            {list.page < list.pageCount && (
              <Link className="btn btn-secondary btn-sm" href={link({ page: String(list.page + 1) })}>
                Next
              </Link>
            )}
          </span>
        </p>
      )}
    </>
  );
}
