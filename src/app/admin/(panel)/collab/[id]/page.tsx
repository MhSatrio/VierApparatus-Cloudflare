import { TaskPage } from "@/components/admin/TaskPage";

export default async function CollabTaskPage({ params }: { params: Promise<{ id: string }> }) {
  return <TaskPage id={(await params).id} back="/admin/collab" />;
}
