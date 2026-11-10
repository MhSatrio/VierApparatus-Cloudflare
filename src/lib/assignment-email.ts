import { escapeHtml } from "./content/text";
import { site } from "./site";

/**
 * The e-mail a collaborator receives when a task is assigned to them. Pure: it only builds the message. Sending is in mail.ts.
 * Everything in the message is escaped; the links point at the admin pages, which still require sign-in.
 */
export type AssignmentMail = {
  id: string; // the task's record ID (the task page address)
  ref: string;
  title: string;
  brief: string;
  priority: string;
  dueDate: string | null;
  articleId: string | null;
  assignedOn: string; // YYYY-MM-DD
  recipientName: string;
};

export function buildAssignmentEmail(m: AssignmentMail): { subject: string; html: string; text: string } {
  const taskLink = `${site.url}/admin/collab/${encodeURIComponent(m.id)}`;
  const articleUrl = m.articleId ? `${site.url}/admin/articles/${m.articleId}` : null;
  const due = m.dueDate ?? "No deadline set";
  const subject = `New task ${m.ref}: ${m.title}`;

  const rows: [string, string][] = [
    ["Task ID", m.ref],
    ["Priority", m.priority],
    ["Deadline", due],
    ["Assigned", m.assignedOn],
  ];
  const html = `<!doctype html><html><body style="margin:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#231F20">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #d9e2f0">
<tr><td style="padding:24px 28px 8px"><p style="margin:0;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#4570B6">VierApparatus</p>
<h1 style="margin:8px 0 0;font-size:22px;line-height:1.3">You have been assigned a task</h1></td></tr>
<tr><td style="padding:12px 28px 4px;font-size:16px;line-height:1.6">Hello ${escapeHtml(m.recipientName)},<br>you have a new task in the VierApparatus Collab workspace.</td></tr>
<tr><td style="padding:12px 28px"><p style="margin:0 0 6px;font-size:18px;font-weight:bold">${escapeHtml(m.title)}</p>
<table role="presentation" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.7">
${rows.map(([k, v]) => `<tr><td style="padding-right:16px;color:#5a5a5a">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join("\n")}
</table></td></tr>
${m.brief ? `<tr><td style="padding:4px 28px 12px"><p style="margin:0 0 4px;font-size:13px;color:#5a5a5a">Instructions</p><p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(m.brief)}</p></td></tr>` : ""}
<tr><td style="padding:8px 28px 24px"><a href="${escapeHtml(taskLink)}" style="display:inline-block;background:#4570B6;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:bold">Open the task</a>
${articleUrl ? `<p style="margin:16px 0 0;font-size:14px">Linked article: <a href="${escapeHtml(articleUrl)}" style="color:#4570B6">open it in Article Management</a></p>` : ""}</td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #e6ebf3;font-size:12px;color:#5a5a5a;line-height:1.6">You receive this because the Master Admin assigned you a task. Sign in to see the full details. Questions: ${escapeHtml(site.email)}.</td></tr>
</table></td></tr></table></body></html>`;

  const text = [
    `Hello ${m.recipientName},`,
    "",
    "You have been assigned a new task in the VierApparatus Collab workspace.",
    "",
    `${m.ref}: ${m.title}`,
    `Priority: ${m.priority}`,
    `Deadline: ${due}`,
    `Assigned: ${m.assignedOn}`,
    m.brief ? `\nInstructions:\n${m.brief}` : "",
    "",
    `Open the task: ${taskLink}`,
    articleUrl ? `Linked article: ${articleUrl}` : "",
    "",
    `Questions: ${site.email}`,
  ]
    .filter((l, i, a) => !(l === "" && a[i - 1] === ""))
    .join("\n");

  return { subject, html, text };
}
