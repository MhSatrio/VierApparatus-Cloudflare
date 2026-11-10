import { CommentModeration } from "@/components/admin/products/CommentModeration";
import { ProductSubNav } from "@/components/admin/products/ProductSubNav";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { commentCounts, countPendingComments, listComments, type CommentStatus } from "@/lib/store/product-comments";

const STATUSES: CommentStatus[] = ["pending", "approved", "rejected", "spam"];

/** Owner only. Product comments waiting for review, with the history of each. */
export default async function ProductCommentsPage({ searchParams }: { searchParams: Promise<{ status?: string; product?: string }> }) {
  await requirePage({ action: "products.manage" });
  const sp = await searchParams;
  const status = STATUSES.find((s) => s === sp.status) ?? (sp.product ? undefined : "pending");
  const [list, counts, pending] = await Promise.all([listComments({ status, productId: sp.product }), commentCounts(), countPendingComments()]);
  return (
    <>
      <PageTitle title="Product comments" sub="Nothing a visitor writes is public until you approve it here." />
      <ProductSubNav current="comments" pending={pending} />
      <CommentModeration initial={list} counts={counts} status={status ?? ""} productId={sp.product} />
    </>
  );
}
