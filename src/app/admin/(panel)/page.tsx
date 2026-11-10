import Link from "next/link";
import { ActivityList } from "@/components/admin/ActivityList";
import { BarList, Badge, Card, DailyChart, dateOnly, dateTime, Empty, PageTitle, Stat } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { dbConfigured } from "@/lib/db/client";
import { STATUS_LABEL } from "@/lib/planner-shared";
import { viewerOf } from "@/lib/planner-http";
import { rangeFromDays, recent } from "@/lib/store/analytics";
import { overview } from "@/lib/store/analytics-rollup";
import { activityForRecords, recentActivity } from "@/lib/store/activity";
import { countByStatus, listForAdmin } from "@/lib/store/articles";
import { collabSummary, listRecords, recordIdsFor } from "@/lib/store/planner";
import { listSubmissions } from "@/lib/store/submissions";
import type { User } from "@/lib/store/users";

export default async function DashboardPage() {
  const { user } = await requirePage();
  if (user.role !== "owner") return <ContributorHome user={user} />;

  const range = rangeFromDays(null, null);
  const viewer = viewerOf(user);
  const [counts, ov, last, subs, collab, feed] = await Promise.all([countByStatus(), overview(range), recent(10), listSubmissions({ status: "pending", perPage: 1 }), collabSummary(viewer), recentActivity(12)]);
  const { summary: sum, days: series, topArticles: pages, sources: src, referrers: refs, campaigns: camp, countries: geo, devices: dev } = ov;

  return (
    <>
      <PageTitle title="Dashboard" sub={`Last 30 days (${range.fromDay} to ${range.toDay}, UTC)`}>
        <Link href="/admin/planner" className="btn btn-secondary btn-sm">
          Planner
        </Link>
        <Link href="/admin/articles/new" className="btn btn-primary btn-sm">
          New article
        </Link>
      </PageTitle>
      {!dbConfigured() && <Empty>The database is not configured yet, so nothing can be shown.</Empty>}

      <h2 className="mb-3 text-lg">Editorial work</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Open tasks" value={collab.open} hint={collab.unassigned ? `${collab.unassigned} not assigned yet` : undefined} href="/admin/planner" />
        <Stat label="Awaiting your review" value={collab.inReview} href="/admin/collab?tab=review" />
        <Stat label="Sent back for revision" value={collab.revision} hint={collab.overdue ? `${collab.overdue} overdue` : undefined} href="/admin/collab" />
        <Stat label="Comments to resolve" value={collab.unresolved} href="/admin/collab" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Recent editorial activity">
          <ActivityList items={feed} base="/admin/planner" empty="No editorial activity yet. Assign a task to a contributor to get started." />
        </Card>
        <div className="grid content-start gap-4 sm:grid-cols-2">
          <Stat label="Published articles" value={counts.published} href="/admin/articles?status=published" />
          <Stat label="Drafts" value={counts.draft} hint={counts.review ? `${counts.review} submitted for review` : undefined} href="/admin/articles?status=draft" />
          <Stat label="Pending proposals" value={subs.pending} href="/admin/submissions" />
          <Stat label="Archived" value={counts.archived} href="/admin/articles?status=archived" />
        </div>
      </div>

      <h2 className="mb-3 mt-8 text-lg">Readers</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Page views" value={sum.pageViews} />
        <Stat label="Unique visitors" value={sum.visitors} hint="Counted once per day (no cookies)" />
        <Stat label="Article views" value={sum.articleViews} />
        <Stat label="Avg. time on page" value={sum.avgEngagedSeconds == null ? "—" : `${sum.avgEngagedSeconds}s`} hint="From visitors who stayed to read" />
      </div>
      {ov.pendingDays > 0 && (
        <p role="status" className="mt-4 rounded-lg border border-dashed border-ink/25 p-3 text-sm text-ink/80">
          {ov.pendingDays} earlier day(s) are still being summarised. Reload once to include them.
        </p>
      )}

      {!sum.hasData ? (
        <div className="mt-6">
          <Empty>No visits have been recorded in this period yet. Analytics starts counting as soon as readers open the public site; nothing here is estimated or sample data.</Empty>
        </div>
      ) : (
        <>
          <Card title="Page views per day" className="mt-6">
            <DailyChart series={series} />
          </Card>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card title="Most-read articles">
              <BarList rows={pages} format={(l) => <Link className="hover:text-brand" href={l}>{l.replace("/articles/", "")}</Link>} />
            </Card>
            <Card title="Traffic sources">
              <BarList rows={src} />
            </Card>
            <Card title="Referring websites">
              <BarList rows={refs} empty="No visits came from other websites." />
            </Card>
            <Card title="Campaigns (UTM)">
              {camp.length === 0 ? (
                <Empty>No tagged links yet. Add ?utm_source=…&utm_campaign=… to a link you share.</Empty>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-ink/70">
                      <th className="pb-2 font-medium">Campaign</th>
                      <th className="pb-2 font-medium">Source / medium</th>
                      <th className="pb-2 text-right font-medium">Visits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {camp.map((c) => (
                      <tr key={`${c.campaign}${c.source}${c.medium}`} className="border-t border-ink/10">
                        <td className="py-1.5">{c.campaign}</td>
                        <td className="py-1.5">{[c.source, c.medium].filter(Boolean).join(" / ") || "—"}</td>
                        <td className="py-1.5 text-right tabular-nums">{c.visits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
            <Card title="Visitor countries">
              <BarList rows={geo} />
              <p className="mt-3 text-xs text-ink/60">From the hosting platform&apos;s edge headers; &ldquo;Unknown&rdquo; when it does not provide one.</p>
            </Card>
            <Card title="Devices">
              <BarList rows={dev} />
            </Card>
          </div>
          <Card title="Recent visitor activity" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] text-sm">
                <thead>
                  <tr className="text-left text-ink/70">
                    <th className="pb-2 font-medium">When</th>
                    <th className="pb-2 font-medium">Page</th>
                    <th className="pb-2 font-medium">Country</th>
                    <th className="pb-2 font-medium">Device</th>
                    <th className="pb-2 font-medium">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {last.map((v, i) => (
                    <tr key={i} className="border-t border-ink/10">
                      <td className="whitespace-nowrap py-1.5">{dateTime(v.ts)}</td>
                      <td className="py-1.5">{v.path}</td>
                      <td className="py-1.5">{v.country || "—"}</td>
                      <td className="py-1.5">{v.device || "—"}</td>
                      <td className="py-1.5">{v.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm">
              <Link href="/admin/analytics" className="text-brand underline underline-offset-4">
                Open the full visit table
              </Link>
            </p>
          </Card>
        </>
      )}
    </>
  );
}

async function ContributorHome({ user }: { user: User }) {
  const canCollab = can(user, "collab.access");
  const canWrite = can(user, "articles.write");
  const viewer = viewerOf(user);
  const [sum, mine, ids, drafts] = await Promise.all([
    canCollab ? collabSummary(viewer) : null,
    canCollab ? listRecords(viewer, { preset: "mine", limit: 8, sort: "due" }) : null,
    canCollab ? recordIdsFor(viewer) : [],
    canWrite ? listForAdmin({ involvedUserId: user.id, perPage: 6 }) : null,
  ]);
  const feed = canCollab ? await activityForRecords(ids, 10) : [];
  return (
    <>
      <PageTitle title={`Welcome, ${user.name}`} sub="Your editorial workspace">
        {canWrite && (
          <Link href="/admin/articles/new" className="btn btn-primary btn-sm">
            New article
          </Link>
        )}
      </PageTitle>
      {!canCollab && !canWrite ? (
        <Empty>Your account does not have access to any workspace yet. Ask the editor to enable it.</Empty>
      ) : (
        <>
          {sum && (
            <div className="grid gap-4 sm:grid-cols-3">
              <Stat label="My open tasks" value={sum.mine} href="/admin/collab" />
              <Stat label="Sent back to me" value={sum.revision} hint="Read the editor's note, then resubmit" href="/admin/collab" />
              <Stat label="Overdue" value={sum.overdue} />
            </div>
          )}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {mine && (
              <Card title="Assigned to me">
                {mine.items.length ? (
                  <ul className="divide-y divide-ink/10">
                    {mine.items.map((r) => (
                      <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                        <Link href={`/admin/collab/${r.id}`} className="font-medium hover:text-brand">
                          <span className="mr-2 text-xs text-ink/60">{r.ref}</span>
                          {r.title}
                        </Link>
                        <span className="flex items-center gap-2 text-sm text-ink/70">
                          <Badge status={r.status === "revision" ? "revision" : "draft"}>{STATUS_LABEL[r.status]}</Badge>
                          {r.dueDate && <span>due {dateOnly(r.dueDate)}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Empty>Nothing is assigned to you right now.</Empty>
                )}
              </Card>
            )}
            {drafts && (
              <Card title="Your drafts">
                {drafts.items.length ? (
                  <ul className="divide-y divide-ink/10">
                    {drafts.items.map((a) => (
                      <li key={a.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                        <Link href={`/admin/articles/${a.id}`} className="font-medium hover:text-brand">
                          {a.title}
                        </Link>
                        <span className="flex items-center gap-2 text-sm text-ink/70">
                          {a.reviewStatus === "requested" && <Badge status="pending">In review</Badge>}
                          {a.reviewStatus === "revision" && <Badge status="revision">Revision requested</Badge>}
                          <Badge status={a.status} />
                          {dateOnly(a.updatedAt)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Empty>No drafts yet. Start one, then submit it for review. Only the editor publishes.</Empty>
                )}
              </Card>
            )}
          </div>
          {canCollab && (
            <Card title="Recent activity on your tasks" className="mt-6">
              <ActivityList items={feed} base="/admin/collab" empty="Activity on the tasks you can see will show up here." />
            </Card>
          )}
        </>
      )}
    </>
  );
}
