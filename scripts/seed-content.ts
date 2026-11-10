/* Imports the Markdown articles in content/articles/*.md into the database (once).
 *   npm run content:seed
 * Each file goes through the same importer and renderer as an article pasted into the admin area. Articles that already
 * exist (same address) are skipped, so the command is safe to repeat. Files starting with "_" are ignored.
 */
import "./_local-client";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { importMarkdown } from "../src/lib/content/markdown";
import { slugify } from "../src/lib/content/text";
import { dbConfigured, db } from "../src/lib/db/client";
import { createArticle, publishArticle, slugInUse } from "../src/lib/store/articles";
import { findCategoryByName } from "../src/lib/store/categories";

/** Editorial filing of the three existing science articles into the new topics (their old category was just "Science"). */
const TOPIC_FOR: Record<string, string> = {
  "in-vivo-crispr-gene-editing-breakthroughs": "Molecular Biology",
  "bioreactor-perfusion-systems-continuous-mammalian-cell-culture": "Biotechnology",
  "what-is-minimum-inhibitory-concentration-mic": "Microbiology",
};

async function main() {
  if (!dbConfigured()) {
    console.error("TURSO_DATABASE_URL is not set.");
    process.exit(1);
  }
  const dir = path.resolve(__dirname, "../content/articles");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /\.(md|markdown)$/.test(f) && !f.startsWith("_")) : [];
  if (!files.length) console.log("No Markdown files found in content/articles.");
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const fm = matter(raw).data as Record<string, unknown>;
    const r = importMarkdown(raw);
    const slug = r.meta.slug ?? slugify(file.replace(/\.(md|markdown)$/, ""));
    if (await slugInUse(slug)) {
      console.log(`skip   ${slug} (already in the database)`);
      continue;
    }
    const topic = TOPIC_FOR[slug];
    const cat = topic ? await findCategoryByName(topic) : null;
    if (!cat) console.warn(`note   ${slug}: no topic mapped, it will stay a draft until you choose one`);
    const date = fm.date ? new Date(String(fm.date)).toISOString() : new Date().toISOString();
    const credit = [fm.coverImageSource, fm.coverImageSourceUrl].filter(Boolean).join(" · ");
    const article = await createArticle(
      {
        title: r.meta.title ?? slug,
        slug,
        excerpt: (r.meta.excerpt ?? "").slice(0, 320),
        categoryId: cat?.id ?? null,
        authorName: r.meta.author ?? "VierApparatus",
        tags: r.meta.tags ?? [],
        coverUrl: r.meta.coverImage ?? null,
        coverAlt: r.meta.coverAlt ?? "",
        coverCredit: credit,
        seoTitle: (r.meta.seoTitle ?? "").slice(0, 70),
        seoDescription: (r.meta.seoDescription ?? "").slice(0, 170),
        doc: r.doc,
        source: "legacy",
      },
      { id: null },
    );
    if (r.meta.published !== false && cat) {
      const pub = await publishArticle(article.id, null);
      if (pub.ok) await db().execute({ sql: "UPDATE articles SET published_at = ?, created_at = ? WHERE id = ?", args: [date, date, article.id] });
      else console.warn(`note   ${slug}: not published (${pub.problems.join(" ")})`);
    }
    console.log(`import ${slug}${r.warnings.length ? `  (${r.warnings.length} import warning${r.warnings.length > 1 ? "s" : ""}: ${r.warnings.join("; ")})` : ""}`);
  }
}

main().catch((e) => {
  console.error("Seeding failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});
