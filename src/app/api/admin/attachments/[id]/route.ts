import { fail } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { getAttachment } from "@/lib/store/attachments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Files sent through the public forms. Owner only, always downloaded (never rendered in the browser). */
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireApi(req, { action: "submissions.review" });
    const id = (await ctx.params).id;
    if (!/^f_[A-Za-z0-9_-]{8,40}$/.test(id)) throw new HttpError(404, "not_found");
    const a = await getAttachment(id);
    if (!a) throw new HttpError(404, "not_found");
    return new Response(a.data as BodyInit, {
      headers: {
        "Content-Type": a.mime,
        "Content-Disposition": `attachment; filename="${a.filename.replace(/"/g, "")}"`,
        "Content-Length": String(a.size),
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox",
      },
    });
  } catch (e) {
    return fail(e);
  }
}
