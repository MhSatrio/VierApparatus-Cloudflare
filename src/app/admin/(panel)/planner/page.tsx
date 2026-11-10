import { PlannerBoard } from "@/components/admin/PlannerBoard";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { viewerOf } from "@/lib/planner-http";
import type { ContentType } from "@/lib/planner-shared";
import { listCategories } from "@/lib/store/categories";
import { getOutline } from "@/lib/store/modules";
import { getInfo, listFields, listRecords, listViews } from "@/lib/store/planner";
import { listPeople } from "@/lib/store/users";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/**
 * The owner's planning table. Every task is about an article or a learning module; the two kinds are listed one at a time
 * (Articles is the default, exactly the table it always was) and feed the same Collab, task page and activity log.
 */
export default async function PlannerPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { user } = await requirePage({ action: "planner.manage" });
  const type: ContentType = one((await searchParams).type) === "module" ? "module" : "article";
  const viewer = viewerOf(user);
  const [list, people, topics, fields, views, info, outline] = await Promise.all([
    listRecords(viewer, { limit: 500, type }),
    listPeople(),
    listCategories(),
    listFields(),
    listViews(viewer, "planner"),
    getInfo(),
    getOutline(),
  ]);
  return (
    <>
      <PageTitle
        title="Planner"
        sub="Master Admin only. Plan articles and learning modules: create tasks, assign them to collaborators, and set deadlines and priorities. Collaborators work on their own tasks in Collab."
      />
      <PlannerBoard
        mode="planner"
        owner
        meId={user.id}
        records={list.items}
        total={list.total}
        people={people.filter((p) => p.role === "contributor" && !p.disabled).map((p) => ({ id: p.id, name: p.name }))}
        topics={topics.map((t) => ({ id: t.id, name: t.name }))}
        fields={fields}
        views={views}
        info={info}
        contentType={type}
        outline={outline}
      />
    </>
  );
}
