import Link from "next/link";
import { redirect } from "next/navigation";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { CONTENT_STATUS_LABEL, NODE_KIND_LABEL, PUBLICATION_LABEL } from "@/lib/modules/shared";
import { viewerOf } from "@/lib/planner-http";
import { listMyModuleTasks } from "@/lib/store/modules";

/**
 * The modules a contributor has been given: module and chapter tasks, each opening the module editor. Shown in the menu only to people
 * with the "modules.write" permission. The owner plans and publishes from the Planner, so the owner is sent there.
 */
export default async function ModulesPage() {
  const { user } = await requirePage({ action: "modules.write" });
  if (can(user, "planner.manage")) redirect("/admin/planner?type=module");
  const items = await listMyModuleTasks(viewerOf(user));
  return (
    <>
      <PageTitle title="Modules" sub="The modules and chapters assigned to you. Open one to write it; the owner reviews and publishes." />
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-ink/25 p-6 text-ink/70">Nothing is assigned to you yet.</p>
      ) : (
        <ul className="divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white shadow-card">
          {items.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4">
              <Link href={m.href} className="font-semibold text-brand underline underline-offset-4">
                {m.title}
              </Link>
              <span className="text-sm text-ink/70">
                {NODE_KIND_LABEL[m.kind]} · {m.where}
              </span>
              <span className="ml-auto text-sm text-ink/80">
                {CONTENT_STATUS_LABEL[m.contentStatus]} · {PUBLICATION_LABEL[m.publication]} · {m.recordRef}
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
