import { ProductEditor } from "@/components/admin/products/ProductEditor";
import { ProductSubNav } from "@/components/admin/products/ProductSubNav";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { listProductCategories } from "@/lib/store/products";

/** Add a product: the full form. It is created as a draft. The owner or a contributor with the products permission may add one. */
export default async function NewProductPage() {
  const { user } = await requirePage({ action: "products.write" });
  const owner = can(user, "products.manage");
  const categories = await listProductCategories();
  return (
    <>
      <PageTitle title="Add product" sub="Describe the product from the manufacturer's documentation. Save it as a draft; publishing is a separate step." />
      <ProductSubNav current="editor" owner={owner} />
      <ProductEditor product={null} categories={categories.map((c) => c.name)} commentCount={0} owner={owner} />
    </>
  );
}
