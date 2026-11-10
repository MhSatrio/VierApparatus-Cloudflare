/**
 * IndexNow (https://www.indexnow.org). Pings Bing, Yandex, Naver, Seznam and other participating engines when URLs
 * change. Google does not use IndexNow; it relies on sitemap.xml. The key is PUBLIC by design: it must be served from
 * the site root as /<key>.txt so engines can verify we own the host. (public/3bd1821b449609681059ce0818d22f17.txt)
 */
export const INDEXNOW_KEY = "3bd1821b449609681059ce0818d22f17";
export const INDEXNOW_HOST = "vierapparatus.com";
export const INDEXNOW_ORIGIN = `https://${INDEXNOW_HOST}`;
export const INDEXNOW_KEY_LOCATION = `${INDEXNOW_ORIGIN}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";
/** IndexNow accepts up to 10,000 URLs per request. */
export const INDEXNOW_BATCH = 10_000;

export function indexNowPayload(urls: string[]) {
  return { host: INDEXNOW_HOST, key: INDEXNOW_KEY, keyLocation: INDEXNOW_KEY_LOCATION, urlList: urls };
}

/** Keep only well-formed https URLs on our own host (IndexNow rejects others with 422), de-duplicated. */
export function cleanUrls(urls: string[]): string[] {
  const out = new Set<string>();
  for (const raw of urls) {
    try {
      const u = new URL(raw);
      if (u.protocol === "https:" && u.host === INDEXNOW_HOST) out.add(u.origin + u.pathname + u.search);
    } catch {
      /* skip malformed */
    }
  }
  return [...out];
}

export function chunk<T>(list: T[], size = INDEXNOW_BATCH): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

export const productUrlFor = (slug: string) => `${INDEXNOW_ORIGIN}/products/${slug}`;
export const articleUrlFor = (slug: string) => `${INDEXNOW_ORIGIN}/articles/${slug}`;

/**
 * Tells IndexNow engines (Bing, Yandex, Naver, Seznam...) that article pages changed. Called after publish, update,
 * unpublish and delete, so the owner never has to collect links by hand. It only runs on the real domain: IndexNow
 * rejects URLs whose host does not match the key's host, so preview/workers.dev/localhost deployments are skipped.
 * Best effort: it never throws and never delays the editor by more than a few seconds.
 */
export async function pingIndexNow(slugs: string[]): Promise<"sent" | "skipped" | "failed"> {
  try {
    const { site } = await import("./site");
    if (new URL(site.url).hostname.replace(/^www\./, "") !== INDEXNOW_HOST) return "skipped";
    const urls = cleanUrls(slugs.map(articleUrlFor));
    if (!urls.length) return "skipped";
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(indexNowPayload(urls)),
      signal: AbortSignal.timeout(4000),
    });
    return res.status === 200 || res.status === 202 ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
