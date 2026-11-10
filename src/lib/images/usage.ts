import { conn } from "../db/client";

/**
 * Whether any content still refers to one of these image addresses: an article's cover or body, a module's body, a sponsor
 * campaign, or an article's own sponsor. An image that is in use is never deleted.
 */
export async function isImageUsed(urls: string[]): Promise<boolean> {
  const db = await conn();
  for (const url of urls.filter(Boolean)) {
    const r = await db.execute({
      sql: `SELECT 1 FROM articles WHERE cover_url = ? OR instr(doc, ?) > 0
            UNION ALL SELECT 1 FROM modules WHERE instr(doc, ?) > 0
            UNION ALL SELECT 1 FROM sponsor_campaigns WHERE image_url = ?
            UNION ALL SELECT 1 FROM article_sponsorships WHERE image_url = ?
            LIMIT 1`,
      args: [url, url, url, url, url],
    });
    if (r.rows.length) return true;
  }
  return false;
}
