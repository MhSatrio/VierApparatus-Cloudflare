import { CategoriesManager } from "@/components/admin/CategoriesManager";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { listCategories } from "@/lib/store/categories";

export default async function CategoriesPage() {
  await requirePage({ action: "categories.manage" });
  const cats = await listCategories();
  return (
    <>
      <PageTitle title="Topics" sub="The subjects readers can browse by. Every published article needs one." />
      <CategoriesManager initial={cats} />
    </>
  );
}
