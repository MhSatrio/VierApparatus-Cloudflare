import Link from "next/link";
import { ProductManager } from "@/components/admin/products/ProductManager";
import { ProductSubNav } from "@/components/admin/products/ProductSubNav";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { PRODUCT_STATUSES, REVIEW_STATUSES } from "@/lib/products/shared";
import { countPendingComments } from "@/lib/store/product-comments";
import { listAllProducts, listManufacturers, listProductCategories, productStatusCounts } from "@/lib/store/products";

type Props = { searchParams: Promise<Record<string, string | undefined>> };

/**
 * The Product Manager. The owner sees every product in one editable table. A contributor with the products permission sees only the
 * products they added, and fewer controls (see ProductManager's `owner` prop).
 */
export default async function ProductManagerPage({ searchParams }: Props) {
  const { user } = await requirePage({ action: "products.write" });
  const owner = can(user, "products.manage");
  const own = owner ? undefined : user.id;
  const sp = await searchParams;
  const pick = <T extends string>(v: string | undefined, allowed: readonly T[]) => (allowed.includes(v as T) ? (v as T) : "");
  const query = {
    q: sp.q ?? "",
    status: pick(sp.status, PRODUCT_STATUSES) as string,
    category: sp.category ?? "",
    manufacturer: sp.manufacturer ?? "",
    review: pick(sp.review, REVIEW_STATUSES) as string,
    origin: sp.origin ?? "",
    sort: sp.sort ?? "",
    dir: (sp.dir === "desc" ? "desc" : "asc") as "asc" | "desc",
    page: Math.max(1, Number(sp.page ?? 1) || 1),
    perPage: [25, 50, 100, 200].includes(Number(sp.perPage)) ? Number(sp.perPage) : 50,
  };
  const [page, counts, categories, manufacturers, pending] = await Promise.all([
    listAllProducts({ ...query, status: query.status as never, review: query.review as never, createdBy: own }),
    productStatusCounts(own),
    listProductCategories(),
    listManufacturers(),
    owner ? countPendingComments() : 0,
  ]);
  return (
    <>
      <PageTitle title="Product Manager" sub="Scientific equipment entries. Only published products are public.">
        <Link href="/admin/products/new" className="btn btn-primary btn-sm">
          + Add Product
        </Link>
        {owner && (
          <Link href="/admin/products/import" className="btn btn-secondary btn-sm">
            Import
          </Link>
        )}
      </PageTitle>
      <ProductSubNav current="table" pending={pending} owner={owner} />
      <ProductManager initial={{ ...page, counts }} categories={categories.map((c) => ({ name: c.name, slug: c.slug, count: c.count }))} manufacturers={manufacturers} initialQuery={query} owner={owner} />
    </>
  );
}
