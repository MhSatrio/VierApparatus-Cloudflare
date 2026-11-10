import { fail, json } from "@/lib/api";
import { saveAttachment } from "@/lib/store/attachments";
import { createInquiry, createSubmission } from "@/lib/store/submissions";
import { contactSchema, fieldErrors } from "@/lib/forms";
import { guardPublicForm, looksAutomated, readForm } from "@/lib/form-endpoint";
import { notifyOwner } from "@/lib/notify";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The contact form. The fields depend on the chosen inquiry type (see contactSchema). Everything is stored in the
 * database first and the owner is then e-mailed; a "Join as contributor" inquiry becomes a pending proposal.
 */
export async function POST(req: Request) {
  try {
    await guardPublicForm(req, "contact", { limit: 5, windowSec: 600 });
    const { fields, file } = await readForm(req);
    const parsed = contactSchema.safeParse({ ...fields, startedAt: fields.startedAt ? Number(fields.startedAt) : undefined });
    if (!parsed.success) return json({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, 400);
    const input = parsed.data;
    if (looksAutomated(fields)) return json({ ok: true }); // bots learn nothing

    let attachmentId: string | null = null;
    if (file) {
      const kind = input.type === "Report a bug" ? "image" : input.type === "Join as contributor" ? "text" : null;
      if (!kind) return json({ ok: false, error: "validation", fields: { file: "Attachments are not accepted for this type of message." } }, 400);
      const saved = await saveAttachment({ name: file.name, bytes: new Uint8Array(await file.arrayBuffer()) }, [kind]);
      if (!saved.ok) return json({ ok: false, error: "validation", fields: { file: saved.error } }, 400);
      attachmentId = saved.id;
    }

    if (input.type === "Join as contributor") {
      await createSubmission(
        { name: input.name, email: input.email, title: input.articleTitle, topic: "To be discussed", proposal: input.proposal, background: "", links: input.links },
        attachmentId,
      );
      void notifyOwner({
        subject: `[VierApparatus] Contributor proposal: ${input.articleTitle}`,
        replyTo: input.email,
        fields: [["Name", input.name], ["Email", input.email], ["Proposed title", input.articleTitle], ["Links", input.links]],
        body: input.proposal,
      });
      return json({ ok: true });
    }

    const extra: Record<string, string> = {};
    let message = "";
    if (input.type === "Partnership") {
      extra.organization = input.organization;
      message = input.message;
    } else if (input.type === "Quotation request") {
      // A lead: who they are, which product (from the page they clicked, or typed), and what they want to know.
      if (input.organization) extra.Institution = input.organization;
      if (input.productName) extra.Product = input.productName;
      if (input.productPath) extra["Product link"] = `${site.url}${input.productPath}`;
      message = input.message;
    } else if (input.type === "Product submission") {
      extra.organization = input.organization;
      if (input.role) extra.role = input.role;
      extra.product = input.productName;
      if (input.links) extra.links = input.links;
      message = input.message;
    } else if (input.type === "Report a bug") {
      extra.pageUrl = input.pageUrl;
      message = input.message;
    } else if (input.type === "Other") {
      extra.subject = input.subject;
      message = input.message;
    } else {
      message = input.message;
    }
    await createInquiry({ type: input.type, name: input.name || "(not given)", email: input.email, message, extra, attachmentId });
    void notifyOwner({
      subject: `[VierApparatus] ${input.type}${extra.subject ? `: ${extra.subject}` : extra.product ? `: ${extra.product}` : ""}`,
      replyTo: input.email,
      fields: [["Type", input.type], ["Name", input.name], ["Email", input.email], ...Object.entries(extra).map(([k, v]) => [k, v] as [string, string])],
      body: message,
    });
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}

export function GET() {
  return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
}
