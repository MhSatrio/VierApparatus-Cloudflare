import Link from "next/link";
import { SubmissionActions } from "@/components/admin/SubmissionActions";
import { Badge, Card, dateTime, Empty, PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { getAttachmentMetas } from "@/lib/store/attachments";
import { listSubmissions, type SubmissionStatus } from "@/lib/store/submissions";

export default async function SubmissionsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requirePage({ action: "submissions.review" });
  const { status: raw } = await searchParams;
  const status = (["pending", "accepted", "rejected", "revision"] as const).find((s) => s === raw) as SubmissionStatus | undefined;
  const { items, pending } = await listSubmissions({ status, perPage: 50 });
  const metas = await getAttachmentMetas(items.map((s) => s.attachmentId));
  const files = new Map(items.map((s) => [s.id, s.attachmentId ? (metas.get(s.attachmentId) ?? null) : null] as const));
  const tab = (label: string, v: string, on: boolean) => (
    <Link key={label} href={v ? `/admin/submissions?status=${v}` : "/admin/submissions"} aria-current={on ? "page" : undefined} className="rounded-full border border-ink/20 px-3 py-1.5 text-sm font-medium hover:border-brand aria-[current=page]:border-brand aria-[current=page]:bg-brand aria-[current=page]:text-white">
      {label}
    </Link>
  );
  return (
    <>
      <PageTitle title="Contributor proposals" sub={`${pending} waiting for review. Submitting never publishes anything or creates an account.`} />
      <div className="mb-4 flex flex-wrap gap-2">
        {tab("All", "", !status)}
        {tab("Pending", "pending", status === "pending")}
        {tab("Needs revision", "revision", status === "revision")}
        {tab("Accepted", "accepted", status === "accepted")}
        {tab("Rejected", "rejected", status === "rejected")}
      </div>
      {items.length === 0 ? (
        <Empty>No proposals here.</Empty>
      ) : (
        <div className="space-y-4">
          {items.map((s) => (
            <Card key={s.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg">{s.title}</h2>
                  <p className="text-sm text-ink/70">
                    {s.name} · <a className="text-brand underline" href={`mailto:${s.email}`}>{s.email}</a> · {dateTime(s.createdAt)}
                  </p>
                </div>
                <Badge status={s.status} />
              </div>
              <dl className="mt-3 space-y-3 text-[0.95rem]">
                <div>
                  <dt className="font-semibold">Topic</dt>
                  <dd>{s.topic}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Proposal</dt>
                  <dd className="whitespace-pre-wrap">{s.proposal}</dd>
                </div>
                {s.background && (
                  <div>
                    <dt className="font-semibold">Scientific background</dt>
                    <dd className="whitespace-pre-wrap">{s.background}</dd>
                  </div>
                )}
                {s.links.length > 0 && (
                  <div>
                    <dt className="font-semibold">Links</dt>
                    <dd>
                      <ul className="list-disc pl-5">
                        {s.links.map((l) => (
                          <li key={l} className="break-all">
                            <a className="text-brand underline" href={l} target="_blank" rel="noopener noreferrer nofollow">
                              {l}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                {files.get(s.id) && (
                  <div>
                    <dt className="font-semibold">Attached draft</dt>
                    <dd>
                      <a className="text-brand underline" href={`/api/admin/attachments/${s.attachmentId}`}>
                        {files.get(s.id)!.filename} ({Math.ceil(files.get(s.id)!.size / 1024)} KB)
                      </a>
                    </dd>
                  </div>
                )}
                {s.ownerNote && (
                  <div>
                    <dt className="font-semibold">Your note</dt>
                    <dd className="whitespace-pre-wrap">{s.ownerNote}</dd>
                  </div>
                )}
              </dl>
              <SubmissionActions id={s.id} status={s.status} articleId={s.articleId} />
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
