import { buildAssignmentEmail } from "../assignment-email";
import { sendMail } from "../mail";
import { audit } from "./util";
import { getUserById } from "./users";

/**
 * Tells a collaborator that a task was assigned to them. Called once per change of assignee (never on ordinary edits, so no
 * duplicate e-mails). A disabled account, a missing address or a failed send is recorded in the audit log and never stops
 * the assignment itself.
 */
export async function notifyAssignee(
  task: { id: string; ref: string; title: string; brief: string; priority: string; dueDate: string | null; articleId: string | null },
  assigneeId: string,
  actor: { id: string | null },
): Promise<void> {
  try {
    await sendAssignmentMail(task, assigneeId, actor);
  } catch (e) {
    await audit(actor.id, "task.assignment_email", `${task.ref}: failed (${e instanceof Error ? e.message.slice(0, 80) : "error"})`);
  }
}

async function sendAssignmentMail(
  task: { id: string; ref: string; title: string; brief: string; priority: string; dueDate: string | null; articleId: string | null },
  assigneeId: string,
  actor: { id: string | null },
): Promise<void> {
  const user = await getUserById(assigneeId);
  if (!user || user.disabled || user.role !== "contributor" || !user.email) {
    await audit(actor.id, "task.assignment_email", `${task.ref}: skipped (no active collaborator address)`);
    return;
  }
  const mail = buildAssignmentEmail({
    id: task.id,
    ref: task.ref,
    title: task.title,
    brief: task.brief,
    priority: task.priority,
    dueDate: task.dueDate,
    articleId: task.articleId,
    assignedOn: new Date().toISOString().slice(0, 10),
    recipientName: user.name,
  });
  const result = await sendMail({ to: user.email, subject: mail.subject, html: mail.html, text: mail.text });
  await audit(actor.id, "task.assignment_email", `${task.ref} to ${user.name}: ${result}`);
}
