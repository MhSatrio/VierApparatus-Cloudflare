import { json, readJson } from "@/lib/api";
import { requireApi } from "@/lib/auth/guard";
import { importRequest } from "@/lib/products/import";
import { productFail, viewer } from "@/lib/products/http";
import { listImportHistory, runImport } from "@/lib/store/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await requireApi(req, { action: "products.manage" });
    return json({ ok: true, items: await listImportHistory() });
  } catch (e) {
    return productFail(e);
  }
}

/**
 * Owner only. `mode: "preview"` checks every row and reports exactly what an import would do, writing nothing. `mode: "commit"` does
 * it, with the same code, and logs the result. No row is dropped silently: each one comes back as added, updated, duplicate or error.
 */
export async function POST(req: Request) {
  try {
    const session = await requireApi(req, { mutation: true, action: "products.manage" });
    const b = await readJson(req, importRequest, 8 * 1024 * 1024);
    const summary = await runImport(viewer(session), b.records, { onDuplicate: b.onDuplicate, filename: b.filename, source: b.source }, b.mode === "commit");
    return json({ ok: true, mode: b.mode, ...summary });
  } catch (e) {
    return productFail(e);
  }
}
