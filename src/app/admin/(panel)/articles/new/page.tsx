import { ArticleEditor } from "@/components/admin/editor/ArticleEditor";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { can } from "@/lib/auth/permissions";
import { listCategories } from "@/lib/store/categories";
import { getMinWords } from "@/lib/store/site-settings";

export default async function NewArticlePage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { user } = await requirePage({ action: "articles.write" });
  const { tab } = await searchParams;
  const categories = await listCategories();
  const minWords = await getMinWords();
  return (
    <>
      <PageTitle title="New article" sub="Drafts save automatically once they have a title. Nothing is public until it is published." />
      <ArticleEditor
        articleId={null}
        version={1}
        status="draft"
        review="none"
        canWrite
        recordId={null}
        comments={[]}
        source="editor"
        publishedAt={null}
        minWords={minWords}
        owner={can(user, "articles.manage")}
        initialTab={tab === "markdown" ? "markdown" : "visual"}
        categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
        blocks={[]}
        meta={{
          title: "",
          slug: "",
          excerpt: "",
          categoryId: null,
          authorName: user.name,
          tags: [],
          coverUrl: null,
          coverAlt: "",
          coverCredit: "",
          coverWidth: null,
          coverHeight: null,
          seoTitle: "",
          seoDescription: "",
          featured: false,
        }}
      />
    </>
  );
}
