import { fail, json } from "@/lib/api";
import { clientIp, ipHash } from "@/lib/auth/request";
import { hit } from "@/lib/auth/ratelimit";
import { verifyChallenge } from "@/lib/captcha";
import { fieldErrors } from "@/lib/forms";
import { guardPublicForm, looksAutomated, readForm } from "@/lib/form-endpoint";
import { commentInput, submitComment } from "@/lib/store/product-comments";
import { getPublishedProduct, ProductError } from "@/lib/store/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * A visitor's comment on a product. Every layer is checked on the server, whatever the page did:
 *   same-origin and size -> per-visitor and global rate limits -> honeypot and timing -> the human check (single-use) ->
 *   validation and sanitising of every field -> a limit per visitor per product -> the same text received twice -> spam signals.
 * What is accepted is stored as PENDING and is public only after the owner approves it.
 */
export async function POST(req: Request, ctx: { params: Promise<{ slug: string }> }) {
  try {
    await guardPublicForm(req, "product-comment", { limit: 4, windowSec: 3600 });
    const { fields } = await readForm(req);
    const product = await getPublishedProduct((await ctx.params).slug);
    if (!product) return json({ ok: false, error: "not_found" }, 404);
    // bots learn nothing from a honeypot or a too-quick submission
    if (looksAutomated({ ...fields, startedAt: fields.startedAt ?? "" })) return json({ ok: true, status: "pending" });

    const check = await verifyChallenge(fields.captchaToken ?? "", fields.captchaAnswer ?? "");
    if (!check.ok) {
      const message =
        check.reason === "wrong" ? "That answer is not right. Please try the new question." : check.reason === "too_fast" ? "Please take a moment to read the question." : check.reason === "missing" ? "Please answer the question above the button." : "The question has expired. Please try the new one.";
      return json({ ok: false, error: "captcha", message, fields: { captchaAnswer: message } }, 400);
    }

    const parsed = commentInput.safeParse({
      displayName: fields.displayName ?? "",
      affiliation: fields.affiliation ?? "",
      orgAddress: fields.orgAddress ?? "",
      role: fields.role ?? "",
      body: fields.body ?? "",
      rating: fields.rating ?? null,
    });
    if (!parsed.success) return json({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, 400);

    const who = await ipHash(clientIp(req));
    const per = await hit(`pcomment:${product.id}:${who}`, 2, 24 * 3600);
    if (!per.ok) return json({ ok: false, error: "rate_limited", message: "You have already sent comments on this product today. Thank you." }, 429);

    const r = await submitComment(product.id, parsed.data, who);
    return json({ ok: true, status: r.status === "spam" ? "pending" : r.status });
  } catch (e) {
    if (e instanceof ProductError) return json({ ok: false, error: e.code, message: e.message }, e.code === "conflict" ? 409 : e.code === "not_found" ? 404 : 400);
    return fail(e);
  }
}
