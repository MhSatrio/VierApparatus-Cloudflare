import type { ProductRecord } from "../products/shared";
import { getArticleById } from "../store/articles";
import { emitEvent } from "./events";
import { articlePayload, productPayload } from "./payloads";

/**
 * Called by the publish code after a change has been saved. The outbox write must never make the change fail, so every hook
 * catches its own errors (they are logged without any content).
 */
export async function connectorArticlePublished(id: string): Promise<void> {
  try {
    const a = await getArticleById(id);
    if (!a || a.status !== "published" || !a.publishedAt) return;
    await emitEvent("article.published", a.id, `article.published:${a.id}:${a.publishedAt}`, articlePayload(a));
  } catch (e) {
    console.error("[connector] could not record article.published", e instanceof Error ? e.name : "error");
  }
}

export async function connectorProductPublished(p: ProductRecord): Promise<void> {
  try {
    if (!p.publishedAt) return;
    await emitEvent("product.published", p.id, `product.published:${p.id}:${p.publishedAt}`, productPayload(p));
  } catch (e) {
    console.error("[connector] could not record product.published", e instanceof Error ? e.name : "error");
  }
}

/** Called only when a product changes into "reviewed" (the caller checks the change). */
export async function connectorProductReviewed(p: ProductRecord): Promise<void> {
  try {
    await emitEvent("product.reviewed", p.id, `product.reviewed:${p.id}:${p.version}`, productPayload(p));
  } catch (e) {
    console.error("[connector] could not record product.reviewed", e instanceof Error ? e.name : "error");
  }
}
