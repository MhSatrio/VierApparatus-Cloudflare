import { notFound } from "next/navigation";
import { ActivityList } from "./ActivityList";
import { TaskDetail } from "./TaskDetail";
import { Card } from "./ui";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { viewerOf } from "@/lib/planner-http";
import { activityFor } from "@/lib/store/activity";
import { listCategories } from "@/lib/store/categories";
import { listComments } from "@/lib/store/comments";
import { getRecord, listFields, listLinkableArticles } from "@/lib/store/planner";
import { listPeople } from "@/lib/store/users";

/** The task page shared by /admin/planner/[id] (owner) and /admin/collab/[id] (everyone who may see the task). */
export async function TaskPage({ id, back }: { id: string; back: string }) {
  const { user } = await requirePage({ action: "collab.access" });
  const viewer = viewerOf(user);
  const owner = user.role === "owner";
  const record = await getRecord(viewer, id); // the access policy lives in this call: anything not visible is a 404
  if (!record) notFound();

  const [fields, comments, activity, people, topics, linkable] = await Promise.all([
    listFields(),
    listComments({ recordId: record.id, articleId: record.articleId }),
    activityFor({ recordId: record.id, articleId: record.articleId }, 30),
    owner ? listPeople() : Promise.resolve([]),
    owner ? listCategories() : Promise.resolve([]),
    owner && !record.module ? listLinkableArticles(viewer) : Promise.resolve([]),
  ]);

  const canOpenEditor = owner || (can(user, "articles.write") && record.assignedTo === user.id && record.articleStatus === "draft" && record.reviewStatus !== "requested");

  return (
    <>
      <TaskDetail
        record={record}
        fields={fields}
        people={people.filter((p) => p.role === "contributor" && !p.disabled).map((p) => ({ id: p.id, name: p.name }))}
        topics={topics.map((t) => ({ id: t.id, name: t.name }))}
        owner={owner}
        meId={user.id}
        comments={comments.map((c) => ({ id: c.id, parentId: c.parentId, authorId: c.authorId, authorName: c.authorName, body: c.body, resolved: c.resolved, createdAt: c.createdAt, editedAt: c.editedAt }))}
        linkable={linkable}
        canOpenEditor={canOpenEditor}
        back={back}
      />
      <Card title="Activity" className="mt-6">
        <ActivityList items={activity} empty="No activity yet." />
      </Card>
    </>
  );
}
