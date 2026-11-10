import { z } from "zod";
import { fail, json, readJson } from "@/lib/api";
import { HttpError, requireApi } from "@/lib/auth/guard";
import { setInquiryStatus } from "@/lib/store/submissions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireApi(req, { mutation: true, action: "inquiries.view" });
    const { status } = await readJson(req, z.object({ status: z.enum(["new", "read", "archived"]) }), 1024);
    if (!(await setInquiryStatus((await ctx.params).id, status))) throw new HttpError(404, "not_found");
    return json({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
