import Link from "next/link";
import { InquiryActions } from "@/components/admin/SubmissionActions";
import { Badge, Card, dateTime, Empty, PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { getAttachmentMetas } from "@/lib/store/attachments";
import { listInquiries, type InquiryStatus } from "@/lib/store/submissions";

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requirePage({ action: "inquiries.view" });
  const { status: raw } = await searchParams;
  const status = (["new", "read", "archived"] as const).find((s) => s === raw) as InquiryStatus | undefined;
  const { items, unread } = await listInquiries({ status, perPage: 50 });
  const metas = await getAttachmentMetas(items.map((i) => i.attachmentId));
  const files = new Map(items.map((i) => [i.id, i.attachmentId ? (metas.get(i.attachmentId) ?? null) : null] as const));
  const tab = (label: string, v: string, on: boolean) => (
    <Link key={label} href={v ? `/admin/inquiries?status=${v}` : "/admin/inquiries"} aria-current={on ? "page" : undefined} className="rounded-full border border-ink/20 px-3 py-1.5 text-sm font-medium hover:border-brand aria-[current=page]:border-brand aria-[current=page]:bg-brand aria-[current=page]:text-white">
      {label}
    </Link>
  );
  return (
    <>
      <PageTitle title="Messages" sub={`${unread} new. Every message is also e-mailed to the owner address when e-mail is configured.`} />
      <div className="mb-4 flex flex-wrap gap-2">
        {tab("All", "", !status)}
        {tab("New", "new", status === "new")}
        {tab("Read", "read", status === "read")}
        {tab("Archived", "archived", status === "archived")}
      </div>
      {items.length === 0 ? (
        <Empty>No messages here.</Empty>
      ) : (
        <div className="space-y-4">
          {items.map((i) => (
            <Card key={i.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="text-lg">{i.type}</h2>
                  <p className="text-sm text-ink/70">
                    {i.name} · <a className="text-brand underline" href={`mailto:${i.email}`}>{i.email}</a> · {dateTime(i.createdAt)}
                  </p>
                </div>
                <Badge status={i.status} />
              </div>
              {Object.entries(i.extra).filter(([, v]) => v).map(([k, v]) => (
                <p key={k} className="mt-2 text-sm">
                  <strong className="capitalize">{k.replace(/([A-Z])/g, " $1")}:</strong> {v}
                </p>
              ))}
              <p className="mt-3 whitespace-pre-wrap">{i.message}</p>
              {files.get(i.id) && (
                <p className="mt-3 text-sm">
                  Attachment:{" "}
                  <a className="text-brand underline" href={`/api/admin/attachments/${i.attachmentId}`}>
                    {files.get(i.id)!.filename}
                  </a>
                </p>
              )}
              <div className="mt-4">
                <InquiryActions id={i.id} status={i.status} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
