// Retired with the static catalogue (see ../README.md). Not run.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { tempDb } from "./helpers";
import products from "../data/products.json";
import type { Product } from "@/lib/product-types";
import { DESC_MAX, DESC_MIN, TITLE_MAX, fitDescription, fitTitle, truncateAtWord } from "@/lib/seo";
import { parsePrice, productDescription, productJsonLd, productTitle } from "@/lib/product-seo";
import { getAllSummaries, getCategoryInfos, getCategoryPage, getRelatedProducts } from "@/lib/products";
import { INDEXNOW_KEY, chunk, cleanUrls, indexNowPayload } from "@/lib/indexnow";
import { categorySlug } from "@/lib/category";

const all = (products as Product[]).filter((p) => p.status === "published");

describe("title / description fitting", () => {
  it("truncates at word boundaries and never exceeds the limit", () => {
    expect(truncateAtWord("Automatic Digital Refractometer with Temperature Compensation", 30)).toBe("Automatic Digital…");
    expect(truncateAtWord("short", 30)).toBe("short");
  });

  it("keeps the model code when a long title must be shortened", () => {
    const t = fitTitle("Horizontal Shaking Incubator With Large Capacity BJPX-SW20-L", { keep: "BJPX-SW20-L" });
    expect(t.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(t).toContain("BJPX-SW20-L");
    expect(t.endsWith("| VierApparatus")).toBe(true);
  });

  it("pads short descriptions into 120-155 and trims long ones", () => {
    const short = fitDescription("Benchtop centrifuge.");
    expect(short.length).toBeGreaterThanOrEqual(DESC_MIN);
    expect(short.length).toBeLessThanOrEqual(DESC_MAX);
    const long = fitDescription("x ".repeat(200));
    expect(long.length).toBeLessThanOrEqual(DESC_MAX);
  });
});

describe(`all ${all.length} published products`, () => {
  it("have a title of at most 60 characters", () => {
    const bad = all.filter((p) => productTitle(p).length > TITLE_MAX || productTitle(p).length < 10);
    expect(bad.map((p) => p.slug).slice(0, 5)).toEqual([]);
  });

  it("have a meta description of 120-155 characters", () => {
    const bad = all.filter((p) => {
      const d = productDescription(p).length;
      return d < DESC_MIN || d > DESC_MAX;
    });
    expect(bad.map((p) => `${p.slug}:${productDescription(p).length}`).slice(0, 5)).toEqual([]);
  });

  it("have mostly unique titles (variant families that differ mid-name can still collide at 60 chars)", () => {
    const counts = new Map<string, number>();
    for (const p of all) counts.set(productTitle(p), (counts.get(productTitle(p)) ?? 0) + 1);
    const duplicated = [...counts.values()].filter((n) => n > 1).reduce((a, b) => a + b, 0);
    expect(duplicated / all.length).toBeLessThan(0.15);
  });

  it("have far fewer identical descriptions than before (shared catalogue text is prefixed with the product name)", () => {
    const counts = new Map<string, number>();
    for (const p of all) counts.set(productDescription(p), (counts.get(productDescription(p)) ?? 0) + 1);
    const duplicated = [...counts.values()].filter((n) => n > 1).reduce((a, b) => a + b, 0);
    expect(duplicated / all.length).toBeLessThan(0.1);
  });

  it("produce structurally valid Product JSON-LD without invented prices", () => {
    for (const p of all) {
      const ld = productJsonLd(p) as Record<string, unknown>;
      expect(ld["@type"]).toBe("Product");
      expect(typeof ld.name).toBe("string");
      expect(ld.sku).toBeTruthy();
      if (ld.image) for (const img of ld.image as string[]) expect(img).toMatch(/^https:\/\//);
      if (ld.image) expect((ld.image as string[]).join()).not.toMatch(/placeholder/i);
      // The catalogue has no prices, so no offers may be emitted (markup must match the visible "Price on request").
      if (!p.price) expect(ld.offers).toBeUndefined();
      expect(() => JSON.parse(JSON.stringify(ld))).not.toThrow();
    }
  });
});

describe("price parsing / offers", () => {
  it("accepts unambiguous currency + amount only", () => {
    expect(parsePrice("USD 1,250.50")).toEqual({ price: "1250.50", currency: "USD" });
    expect(parsePrice("1250 EUR")).toEqual({ price: "1250.00", currency: "EUR" });
    expect(parsePrice("€1.250,50")).toEqual({ price: "1250.50", currency: "EUR" });
    expect(parsePrice("£99")).toEqual({ price: "99.00", currency: "GBP" });
    expect(parsePrice("IDR 12,500,000")).toEqual({ price: "12500000.00", currency: "IDR" });
    expect(parsePrice("$100")).toBeNull(); // bare "$" is ambiguous
    expect(parsePrice("1250")).toBeNull(); // no currency
    expect(parsePrice("Price on request")).toBeNull();
    expect(parsePrice("EUR 1.250")).toBeNull(); // ambiguous separator
    expect(parsePrice(null)).toBeNull();
  });

  it("emits a valid Offer only for a real price", () => {
    const base = all[0];
    const priced = productJsonLd({ ...base, price: "USD 1,250.50", availability: "In stock" }) as { offers: Record<string, unknown> };
    expect(priced.offers).toMatchObject({ "@type": "Offer", price: "1250.50", priceCurrency: "USD", availability: "https://schema.org/InStock" });
  });

  it("omits placeholder images from structured data", () => {
    const ph = all.find((p) => /placeholder/i.test(p.imageUrl ?? ""))!;
    expect((productJsonLd(ph) as { image?: string[] }).image).toBeUndefined();
  });
});

describe("internal linking (no orphans)", () => {
  const summaries = getAllSummaries();

  it("every product with category siblings is linked from at least one other product page", () => {
    const linked = new Set<string>();
    for (const s of summaries) for (const r of getRelatedProducts(s)) linked.add(r.id);
    const sizes = new Map<string, number>();
    for (const s of summaries) sizes.set(s.category, (sizes.get(s.category) ?? 0) + 1);
    const orphans = summaries.filter((s) => (sizes.get(s.category) ?? 0) > 1 && !linked.has(s.id));
    expect(orphans.length).toBe(0);
  });

  it("every product receives at least 3 incoming related links (ring of neighbours)", () => {
    const incoming = new Map<string, number>();
    for (const s of summaries) for (const r of getRelatedProducts(s)) incoming.set(r.id, (incoming.get(r.id) ?? 0) + 1);
    const sizes = new Map<string, number>();
    for (const s of summaries) sizes.set(s.category, (sizes.get(s.category) ?? 0) + 1);
    const weak = summaries.filter((s) => (sizes.get(s.category) ?? 0) > 6 && (incoming.get(s.id) ?? 0) < 3);
    expect(weak.length).toBe(0);
  });

  it("related products never include the product itself and stay in the same category", () => {
    for (const s of summaries.slice(0, 500)) {
      const rel = getRelatedProducts(s);
      expect(rel.some((r) => r.id === s.id)).toBe(false);
      expect(rel.every((r) => r.category === s.category)).toBe(true);
    }
  });

  it("category hub pages together list every product exactly once", () => {
    const seen = new Map<string, number>();
    for (const c of getCategoryInfos()) {
      for (let page = 1; page <= c.pageCount; page++) for (const p of getCategoryPage(c.name, page).items) seen.set(p.id, (seen.get(p.id) ?? 0) + 1);
    }
    expect(seen.size).toBe(summaries.length);
    expect([...seen.values()].every((n) => n === 1)).toBe(true);
  });

  it("category slugs are unique", () => {
    const slugs = getCategoryInfos().map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(categorySlug("Incubators, Ovens & Baths")).toBe("incubators-ovens-and-baths");
  });
});

describe("sitemap shards", () => {
  /** The sitemap module reads ENABLE_PRODUCTS when it is loaded, so each case loads a fresh copy. */
  async function load(productsOn: boolean) {
    vi.stubEnv("ENABLE_PRODUCTS", productsOn ? "true" : "false");
    vi.resetModules();
    const cleanup = tempDb();
    await (await import("@/lib/store/site-settings")).setMinWords(0);
    const mod = await import("@/app/sitemap");
    return { mod, done: () => { cleanup(); vi.unstubAllEnvs(); vi.resetModules(); } };
  }

  it("with the product catalogue switched ON: cover every product exactly once, within the 50,000-URL limit", async () => {
    const { mod, done } = await load(true);
    try {
      const shards = await mod.generateSitemaps();
      const urls: string[] = [];
      for (const s of shards) {
        const entries = await mod.default({ id: Promise.resolve(String(s.id)) });
        expect(entries.length).toBeLessThanOrEqual(50000);
        if (s.id > 0) expect(entries.length).toBeLessThanOrEqual(mod.SITEMAP_CHUNK);
        urls.push(...entries.map((e) => e.url));
      }
      const productUrls = urls.filter((u) => /\/products\/(?!category\/)[^/]+$/.test(u));
      expect(productUrls.length).toBe(all.length);
      expect(new Set(urls).size).toBe(urls.length);
      expect(urls.some((u) => u.includes("/products/category/"))).toBe(true);
    } finally {
      done();
    }
  });

  it("with the product catalogue switched OFF (the default): one shard and no product URLs at all", async () => {
    const { mod, done } = await load(false);
    try {
      expect(await mod.generateSitemaps()).toEqual([{ id: 0 }]);
      const urls = (await mod.default({ id: Promise.resolve("0") })).map((e) => e.url);
      expect(urls.length).toBeGreaterThan(3);
      expect(urls.some((u) => /\/products|sitemap-html|\/shop|quotation/i.test(u))).toBe(false);
      expect(urls.some((u) => u.endsWith("/admin") || u.includes("/admin/"))).toBe(false);
    } finally {
      done();
    }
  });
});
