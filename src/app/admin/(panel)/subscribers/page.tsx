import { SubscriberTable } from "@/components/admin/newsletter/SubscriberTable";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { listCategories } from "@/lib/store/categories";
import { usedInterests } from "@/lib/store/subscribers";

/** Owner only. The newsletter list: search, sort, filter, edit, delete, CSV import and export. */
export default async function SubscribersPage() {
  await requirePage({ action: "newsletter.manage" });
  const [categories, used] = await Promise.all([listCategories(), usedInterests()]);
  // Topics from the site plus any older label still held by a subscriber, so nothing becomes unfilterable.
  const topics = [...new Set([...categories.map((c) => c.name), ...used])];
  return (
    <>
      <PageTitle title="Newsletter Subscribers" sub="People who asked for the newsletter. Only active subscribers receive issues. Imported people are saved as waiting: they cannot confirm yet, because the invitation e-mail is not built." />
      <SubscriberTable topics={topics} />
    </>
  );
}
