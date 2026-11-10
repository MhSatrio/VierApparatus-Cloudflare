import { fail, json } from "@/lib/api";
import { saveAttachment } from "@/lib/store/attachments";
import { createSubmission } from "@/lib/store/submissions";
import { fieldErrors, submissionSchema } from "@/lib/forms";
import { guardPublicForm, looksAutomated, readForm } from "@/lib/form-endpoint";
import { notifyOwner } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * "Join as contributor" proposal. It is stored as a PENDING submission for the owner to review. It does not create an
 * account, grants no access and publishes nothing.
 */
export async function POST(req: Request) {
  try {
    await guardPublicForm(req, "contribute", { limit: 3, windowSec: 3600 });
    const { fields, file } = await readForm(req);
    const parsed = submissionSchema.safeParse({ ...fields, startedAt: fields.startedAt ? Number(fields.startedAt) : undefined });
    if (!parsed.success) return json({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, 400);
    if (looksAutomated(fields)) return json({ ok: true });
    const input = parsed.data;

    let attachmentId: string | null = null;
    if (file) {
      const saved = await saveAttachment({ name: file.name, bytes: new Uint8Array(await file.arrayBuffer()) }, ["text"]);
      if (!saved.ok) return json({ ok: false, error: "validation", fields: { file: saved.error } }, 400);
      attachmentId = saved.id;
    }
    await createSubmission(input, attachmentId);
    void notifyOwner({
      subject: `[VierApparatus] Contributor proposal: ${input.title}`,
      replyTo: input.email,
      fields: [["Name", input.name], ["Email", input.email], ["Title", input.title], ["Topic", input.topic], ["Links", input.links]],
      body: `${input.proposal}${input.background ? `\n\nBackground:\n${input.background}` : ""}`,
    });
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}

export function GET() {
  return json({ ok: false, error: "method_not_allowed" }, 405, { Allow: "POST" });
}
