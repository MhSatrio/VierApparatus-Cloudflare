import { z } from "zod";
import { json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { productFail, viewer } from "@/lib/products/http";
import { DEFAULT_TEXTS, getProductTexts, setProductTexts } from "@/lib/store/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "products.manage" });
    return json({ ok: true, texts: await getProductTexts(), defaults: DEFAULT_TEXTS });
  } catch (e) {
    return productFail(e);
  }
}

const box = z.object({ title: z.string(), body: z.string() });

/** Owner only: the disclaimer and the invitation shown at the top of the public Product page. */
export async function PUT(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.manage" });
    const texts = await readJson(req, z.object({ disclaimer: box, invite: box }), 32 * 1024);
    await setProductTexts(viewer(session), texts);
    return json({ ok: true });
  } catch (e) {
    return productFail(e);
  }
}
