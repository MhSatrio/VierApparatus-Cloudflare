import { ProductImport } from "@/components/admin/products/ProductImport";
import { ProductSubNav } from "@/components/admin/products/ProductSubNav";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { countPendingComments } from "@/lib/store/product-comments";
import { listImportHistory } from "@/lib/store/products";

/** Owner only. Import products from a CSV file or from cells pasted out of a spreadsheet. */
export default async function ProductImportPage() {
  await requirePage({ action: "products.manage" });
  const [history, pending] = await Promise.all([listImportHistory(), countPendingComments()]);
  return (
    <>
      <PageTitle title="Import products" sub="From a CSV file or from cells copied out of Excel or Google Sheets. Every row is checked before anything is saved." />
      <ProductSubNav current="import" pending={pending} />
      <ProductImport history={history} />
    </>
  );
}
