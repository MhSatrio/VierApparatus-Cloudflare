import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { tempDb } from "./helpers";
import { bootstrapOwner, createContributorAccount } from "@/lib/auth/service";
import { can, DEFAULT_CONTRIBUTOR_PERMISSIONS, GRANTABLE, type Grantable } from "@/lib/auth/permissions";
import { conn } from "@/lib/db/client";
import { viewerOf } from "@/lib/planner-http";
import { createProduct, getProduct, listAllProducts, ProductError, setProductStatus, updateProduct } from "@/lib/store/products";
import { canEditModule, ensureCurriculum, getModuleEdit } from "@/lib/store/modules";
import { assignRecord, listRecords } from "@/lib/store/planner";
import { getUserByEmail, type User } from "@/lib/store/users";

/**
 * Contributor access: each area is its own checkbox. Without it the area is not in the menu, its pages refuse the visit, and its
 * actions are refused on the server. The owner always has every area.
 */
describe("the permission list", () => {
  it("has one checkbox each for articles, modules and products, and new contributors get none of the new two", () => {
    for (const p of ["articles.write", "modules.write", "products.write"] as const) expect(GRANTABLE).toContain(p);
    expect(DEFAULT_CONTRIBUTOR_PERMISSIONS).toEqual(["collab.access", "articles.write", "media.upload"]);
  });

  it("gives the owner everything, and a contributor only what was granted", () => {
    const owner = { role: "owner" as const, permissions: [] as string[] };
    const contributor = (perms: Grantable[]) => ({ role: "contributor" as const, permissions: perms as string[] });
    expect(can(owner, "modules.write")).toBe(true);
    expect(can(owner, "products.write")).toBe(true);
    expect(can(owner, "products.manage")).toBe(true);
    expect(can(contributor([]), "modules.write")).toBe(false);
    expect(can(contributor([]), "products.write")).toBe(false);
    expect(can(contributor(["modules.write"]), "modules.write")).toBe(true);
    expect(can(contributor(["modules.write"]), "products.write")).toBe(false);
    // the owner-only areas are never grantable
    expect(can(contributor(["products.manage" as Grantable]), "products.manage")).toBe(false);
  });
});

describe("contributor access (database)", () => {
  let cleanup: () => void;
  let owner: User;
  let article: User;
  let moduleOnly: User;
  let productOnly: User;
  let nothing: User;

  beforeAll(async () => {
    cleanup = tempDb();
    await bootstrapOwner({ email: "info@vierapparatus.com", name: "Editor In Chief", password: "Owner-Access-Pass-2026!" });
    owner = (await getUserByEmail("info@vierapparatus.com"))!;
    const db = await conn();
    await db.execute({ sql: "UPDATE users SET must_change_password = 0 WHERE id = ?", args: [owner.id] });
    const make = async (name: string, email: string, permissions: Grantable[]) => {
      const r = await createContributorAccount(owner.id, { name, email, password: "Contributor-Access-Pass-2026!", permissions });
      if (!r.ok) throw new Error(r.error);
      return r.user;
    };
    article = await make("Ann Articles", "ann@example.org", ["articles.write"]);
    moduleOnly = await make("Mo Modules", "mo@example.org", ["modules.write"]);
    productOnly = await make("Pia Products", "pia@example.org", ["products.write"]);
    nothing = await make("Nia Nothing", "nia@example.org", []);
    await ensureCurriculum({ id: owner.id, name: owner.name });
  });
  afterAll(() => cleanup());

  const product = { name: "Access test centrifuge", manufacturer: "Access Maker", category: "Centrifuges", shortDescription: "A centrifuge for the access test." };

  it("lets a contributor with the products permission add a draft, but not publish it", async () => {
    const pia = viewerOf(productOnly);
    const made = await createProduct(pia, { ...product, name: "Pia draft", modelNumber: "PD-1" }, { status: "published" });
    expect(made.status).toBe("draft"); // asking for published is ignored
    expect(made.createdBy).toBe(productOnly.id);
    await expect(setProductStatus(pia, made.id, "published")).rejects.toMatchObject({ code: "forbidden" });
    await expect(setProductStatus(pia, made.id, "approved")).rejects.toMatchObject({ code: "forbidden" });
    // but the draft can go to review
    expect((await setProductStatus(pia, made.id, "under_review")).status).toBe("under_review");
  });

  it("does not let them change the editorial part, and locks their product once it is under review", async () => {
    const pia = viewerOf(productOnly);
    const made = await createProduct(pia, { ...product, name: "Pia editorial", modelNumber: "PE-1", advantages: ["Quiet"], reviewStatus: "reviewed", editorialReview: "Written by a contributor" });
    expect(made.reviewStatus).toBe("listed");
    expect(made.editorialReview).toBe("");
    expect(made.advantages).toEqual([]);
    const edited = await updateProduct(pia, made.id, { ...product, name: "Pia editorial renamed", modelNumber: "PE-1", reviewStatus: "reviewed", editorialReview: "changed", expectedVersion: made.version });
    expect(edited.name).toBe("Pia editorial renamed");
    expect(edited.reviewStatus).toBe("listed");
    expect(edited.editorialReview).toBe("");
    await setProductStatus(pia, made.id, "under_review");
    await expect(updateProduct(pia, made.id, { ...product, name: "Too late", modelNumber: "PE-1", expectedVersion: edited.version + 1 })).rejects.toMatchObject({ code: "forbidden" });
  });

  it("shows a contributor only their own products, and refuses another contributor's product", async () => {
    const pia = viewerOf(productOnly);
    const mine = await createProduct(pia, { ...product, name: "Pia listed", modelNumber: "PL-1" });
    const theirs = await createProduct(viewerOf(owner), { ...product, name: "Owner's own", modelNumber: "OO-1" });
    const list = await listAllProducts({ createdBy: productOnly.id, perPage: 200 });
    expect(list.items.map((p) => p.id)).toContain(mine.id);
    expect(list.items.map((p) => p.id)).not.toContain(theirs.id);
    await expect(updateProduct(pia, theirs.id, { ...product, name: "Hijack", modelNumber: "OO-1", expectedVersion: theirs.version })).rejects.toMatchObject({ code: "forbidden" });
    await expect(setProductStatus(pia, theirs.id, "under_review")).rejects.toMatchObject({ code: "forbidden" });
    expect((await getProduct(theirs.id))!.name).toBe("Owner's own");
  });

  it("refuses everything product-related to a contributor without the permission", async () => {
    const nia = viewerOf(nothing);
    await expect(createProduct(nia, { ...product, modelNumber: "N-1" })).rejects.toBeInstanceOf(ProductError);
    await expect(createProduct(nia, { ...product, modelNumber: "N-2" })).rejects.toMatchObject({ code: "forbidden" });
  });

  it("lets a contributor write a module only when they have modules.write AND the module is assigned to them", async () => {
    const db = await conn();
    const task = (await listRecords(viewerOf(owner), { type: "module", limit: 500 })).items.find((r) => r.title === "Introduction to Biology")!;
    const moduleId = task.module!.nodeId;
    await assignRecord(viewerOf(owner), task.id, moduleOnly.id);
    // the article contributor is given a different module (one task has one assignee)
    const articleTask = (await listRecords(viewerOf(owner), { type: "module", limit: 500 })).items.find((r) => r.title === "Characteristics of Life")!;
    await assignRecord(viewerOf(owner), articleTask.id, article.id);
    // assigned and has modules.write: may edit
    expect(await canEditModule(viewerOf(moduleOnly), moduleId)).toBe(true);
    expect((await getModuleEdit(viewerOf(moduleOnly), moduleId))?.canWrite).toBe(true);
    // assigned to a module but has only articles.write: may not write modules at all
    expect(await canEditModule(viewerOf(article), articleTask.module!.nodeId)).toBe(false);
    expect(await getModuleEdit(viewerOf(article), articleTask.module!.nodeId)).toBeNull();
    // has modules.write but is not assigned to this one: may not
    expect(await canEditModule(viewerOf(moduleOnly), articleTask.module!.nodeId)).toBe(false);
    expect(Number((await db.execute("SELECT COUNT(*) AS c FROM planner_records WHERE assigned_to = ?", [moduleOnly.id])).rows[0].c)).toBeGreaterThan(0);
  });
});
