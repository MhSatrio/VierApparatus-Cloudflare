export type Role = "owner" | "contributor";

/**
 * What the owner can switch on for a contributor. Everything else is owner-only and can never be granted: publishing,
 * analytics, accounts, passwords, topics, planner configuration, settings, deleting other people's work.
 */
export const GRANTABLE = ["collab.access", "articles.write", "modules.write", "products.write", "media.upload"] as const;
export type Grantable = (typeof GRANTABLE)[number];

export const GRANTABLE_LABEL: Record<Grantable, string> = {
  "collab.access": "Use Collab: see assigned tasks, add research notes and comments, update progress, submit work for review",
  "articles.write": "Articles: write and edit assigned or own draft articles, and submit them for review. Shows Article Management in the menu",
  "modules.write": "Modules: write the modules and chapters assigned to them, and submit them for review. Shows Modules in the menu",
  "products.write": "Products: add product entries as drafts, edit their own drafts, and send them for review. Shows Products in the menu",
  "media.upload": "Upload images for their articles, modules and products",
};

export const DEFAULT_CONTRIBUTOR_PERMISSIONS: Grantable[] = ["collab.access", "articles.write", "media.upload"];

export type Action =
  | Grantable
  | "articles.manage" // see/edit/publish/archive/delete ANY article
  | "articles.publish"
  | "analytics.view"
  | "users.manage" // create accounts, set/reset passwords, disable, delete, permissions
  | "planner.manage" // create/assign/configure planner records, fields, global views, info box
  | "categories.manage"
  | "submissions.review"
  | "inquiries.view"
  | "settings.manage"
  | "sponsors.manage" // sponsor campaigns and per-article sponsorship (owner only)
  | "newsletter.manage" // subscribers, import/export and the popup switch (owner only)
  | "products.manage"; // the product catalogue, its imports, and the moderation of product comments (owner only)

export type Actor = { role: Role; permissions: readonly string[] };

export function can(actor: Actor, action: Action): boolean {
  if (actor.role === "owner") return true;
  return (GRANTABLE as readonly string[]).includes(action) && actor.permissions.includes(action);
}

export const sanitizePermissions = (list: unknown): Grantable[] =>
  Array.isArray(list) ? GRANTABLE.filter((g) => list.includes(g)) : [];
