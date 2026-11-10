import { notFound } from "next/navigation";
import { ProductEditor } from "@/components/admin/products/ProductEditor";
import { ProductSubNav } from "@/components/admin/products/ProductSubNav";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { listComments } from "@/lib/store/product-comments";
import { getProduct, listProductCategories } from "@/lib/store/products";

/** One product's editor. A contributor reaches only the products they added; anything else is shown as not found. */
export default async function ProductEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await requirePage({ action: "products.write" });
  const owner = can(user, "products.manage");
  const { id } = await params;
  const [product, categories, comments] = await Promise.all([getProduct(id), listProductCategories(), owner ? listComments({ productId: id, perPage: 1 }) : Promise.resolve({ total: 0 })]);
  if (!product || (!owner && product.createdBy !== user.id)) notFound();
  return (
    <>
      <PageTitle title={product.name} sub={`${product.manufacturer}${product.modelNumber ? ` · ${product.modelNumber}` : ""}`} />
      <ProductSubNav current="editor" owner={owner} />
      <ProductEditor key={`${product.id}:${product.version}`} product={product} categories={categories.map((c) => c.name)} commentCount={comments.total} owner={owner} />
    </>
  );
}
