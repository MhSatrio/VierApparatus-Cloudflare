import { PlannerBoard } from "@/components/admin/PlannerBoard";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { viewerOf } from "@/lib/planner-http";
import type { ContentType, Preset } from "@/lib/planner-shared";
import { listCategories } from "@/lib/store/categories";
import { getInfo, listFields, listRecords, listViews } from "@/lib/store/planner";
import { listPeople } from "@/lib/store/users";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const TABS: Preset[] = ["mine", "team", "review", "recent", "completed"];

/**
 * Collab: the planner records the viewer may see (the owner: all; a contributor: assigned to, created by or shared with them),
 * as a table or Kanban with ready-made lists. Same records as the Planner, so nothing is duplicated.
 */
export default async function CollabPage({ searchParams }: { searchParams: Promise<SP> }) {
  const { user } = await requirePage({ action: "collab.access" });
  const sp = await searchParams;
  const type: ContentType = one(sp.type) === "module" ? "module" : "article";
  const owner = user.role === "owner";
  const viewer = viewerOf(user);
  const [list, people, topics, fields, views, info] = await Promise.all([
    listRecords(viewer, { limit: 500, type }),
    owner ? listPeople() : Promise.resolve([]),
    owner ? listCategories() : Promise.resolve([]),
    listFields(),
    listViews(viewer, "collab"),
    getInfo(),
  ]);
  const tab = one(sp.tab) as Preset;
  // A contributor only ever learns the names that already appear on tasks they can see.
  const names = owner
    ? people.filter((p) => p.role === "contributor" && !p.disabled).map((p) => ({ id: p.id, name: p.name }))
    : [...new Map(list.items.filter((r) => r.assignedTo && r.assignedToName).map((r) => [r.assignedTo!, { id: r.assignedTo!, name: r.assignedToName! }])).values()];
  const who = one(sp.who);
  return (
    <>
      <PageTitle
        title="Collab"
        sub={
          owner
            ? "Every team task, as collaborators see it. Create and assign tasks in the Planner."
            : "Your assigned tasks. Update the status, add notes and comments. Your changes appear in the Planner for the Master Admin."
        }
      />
      <PlannerBoard
        mode="collab"
        owner={owner}
        meId={user.id}
        records={list.items}
        total={list.total}
        people={names}
        topics={topics.map((t) => ({ id: t.id, name: t.name }))}
        fields={fields}
        views={views}
        info={info}
        initialTab={TABS.includes(tab) ? tab : undefined}
        initialAssignee={owner && who ? who : undefined}
        contentType={type}
      />
    </>
  );
}
