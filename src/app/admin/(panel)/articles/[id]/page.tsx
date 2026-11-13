import { notFound } from "next/navigation";
import { ArticleEditor } from "@/components/admin/editor/ArticleEditor";
import { CopyText } from "@/components/admin/CopyText";
import { PageTitle } from "@/components/admin/ui";
import { requirePage } from "@/lib/auth/guard";
import { canEditArticle, canViewArticle } from "@/lib/article-access";
import { can } from "@/lib/auth/permissions";
import { getArticleById } from "@/lib/store/articles";
import { listCategories } from "@/lib/store/categories";
import { getMinWords } from "@/lib/store/site-settings";
import { listComments } from "@/lib/store/comments";
import { getRecordForArticle } from "@/lib/store/planner";

export default async function EditArticlePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string }> }) {
  const { user } = await requirePage({ action: "articles.write" });
  const [{ id }, { tab }] = await Promise.all([params, searchParams]);
  const a = await getArticleById(id);
  // A contributor asking for someone else's article gets a plain 404 (it does not reveal that it exists).
  if (!a || !canViewArticle(user, a)) notFound();
  const [categories, record] = await Promise.all([listCategories(), getRecordForArticle(a.id)]);
  const minWords = await getMinWords();
  // Comments live on the planner task when there is one, so the owner and the contributor read one conversation.
  const comments = await listComments({ recordId: record?.id ?? null, articleId: a.id });
  return (
    <>
      <PageTitle title="Edit article" sub={a.status === "published" ? `Live at /articles/${a.slug}. Saving changes updates the live page; address changes keep a redirect.` : `Status: ${a.status}.${a.assignedToName ? ` Assigned to ${a.assignedToName}.` : ""}${a.lastEditorName ? ` Last edited by ${a.lastEditorName}.` : ""}`} />
      <p className="-mt-4 mb-5 text-sm text-ink/70">
        Article ID <CopyText value={a.id} label="Copy ID" />
      </p>
      <ArticleEditor
        key={`${a.id}:${a.version}`}
        articleId={a.id}
        version={a.version}
        status={a.status}
        review={a.reviewStatus}
        canWrite={canEditArticle(user, { ...a, reviewStatus: "none" })}
        recordId={record?.id ?? null}
        comments={comments.map((c) => ({ id: c.id, parentId: c.parentId, authorId: c.authorId, authorName: c.authorName, body: c.body, resolved: c.resolved, createdAt: c.createdAt, editedAt: c.editedAt }))}
        source={a.source}
        publishedAt={a.publishedAt}
        minWords={minWords}
        references={a.refs}
        refcheck={{ status: a.refcheckStatus, current: a.refcheckCurrent, checkedAt: a.refcheckAt, items: a.refcheckReport }}
        owner={can(user, "articles.manage")}
        initialTab={tab === "markdown" ? "markdown" : tab === "details" ? "details" : tab === "history" ? "history" : "visual"}
        categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
        blocks={a.doc.blocks}
        meta={{
          title: a.title,
          slug: a.slug,
          excerpt: a.excerpt,
          categoryId: a.categoryId,
          authorName: a.authorName,
          tags: a.tags,
          coverUrl: a.coverUrl,
          coverAlt: a.coverAlt,
          coverCredit: a.coverCredit,
          coverWidth: a.coverWidth,
          coverHeight: a.coverHeight,
          seoTitle: a.seoTitle,
          seoDescription: a.seoDescription,
          featured: a.featured,
        }}
      />
    </>
  );
}
