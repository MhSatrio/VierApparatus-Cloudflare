import { ProductSubNav } from "@/components/admin/products/ProductSubNav";
import { ProductTextsForm } from "@/components/admin/products/ProductTextsForm";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { countPendingComments } from "@/lib/store/product-comments";
import { DEFAULT_TEXTS, getProductTexts } from "@/lib/store/products";

/** Owner only. The disclaimer and the invitation on the public Product page. */
export default async function ProductTextsPage() {
  await requirePage({ action: "products.manage" });
  const [texts, pending] = await Promise.all([getProductTexts(), countPendingComments()]);
  return (
    <>
      <PageTitle title="Product page texts" sub="The wording at the top of the public Product page." />
      <ProductSubNav current="texts" pending={pending} />
      <ProductTextsForm initial={texts} defaults={DEFAULT_TEXTS} />
    </>
  );
}
