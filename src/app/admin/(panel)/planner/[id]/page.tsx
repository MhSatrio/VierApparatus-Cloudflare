import { TaskPage } from "@/components/admin/TaskPage";
import { requirePage } from "@/lib/auth/guard";

export default async function PlannerTaskPage({ params }: { params: Promise<{ id: string }> }) {
  await requirePage({ action: "planner.manage" });
  return <TaskPage id={(await params).id} back="/admin/planner" />;
}
