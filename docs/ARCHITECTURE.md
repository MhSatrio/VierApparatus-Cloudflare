# Architecture

## Why this shape

| Requirement | Decision |
|---|---|
| Publish without a Git commit; neither Vercel nor Cloudflare lets a site write files at runtime | Articles, users, proposals, messages, analytics and images live in **one Turso (libSQL) database**, reached over HTTPS from both platforms. Both deployments read and write the same data. |
| Same behaviour on Vercel and Cloudflare | One codebase (`next.config.ts` is shared; Cloudflare detected by `open-next.config.ts`). Only deployment files differ, and `scripts/sync-cloudflare.mjs` keeps the rest identical. |
| Editor and Markdown must look identical | A single canonical document model (`src/lib/content/schema.ts`), one renderer (`render.ts`) and one `ArticleView` component. |
| Safe rendering | The model holds text and marks, never HTML. The renderer escapes everything and emits a fixed tag whitelist. Links/images are scheme-checked. |
| Fast public pages | Server-rendered HTML, no client framework code for readers except a ~1 KB beacon. KaTeX (~100 KB) loads only on pages that contain an equation. The editor, admin and charts are separate routes and never load on public pages. |
| Lightweight | Added runtime dependencies: `@libsql/client`, `unified` + `remark-parse` + `remark-math` (Markdown), `katex`. No auth, ORM, editor or chart library. |

## Data model (`src/lib/db/migrations.ts`)

`users`, `sessions`, `rate_limits`, `categories`, `media`, `articles` (+ `slug_redirects`, `gone_slugs`, `article_revisions`), `attachments`, `submissions`, `inquiries`,
`planner_records`, `planner_fields`, `planner_views`, `comments`, `activity` (collaboration), `events` + `analytics_daily` (analytics), `audit_log`, `settings`, `meta`. Migrations are append-only and run automatically on the first request of each instance.

## Request flow

```
Reader  → Next.js page (force-dynamic) → store (libSQL/HTTPS) → stored doc → renderDoc → ArticleView   (edge-cached ~1–5 min)
Editor  → /admin (server-checked session) → editor state (canonical blocks) → PUT /api/admin/articles/:id → validate (zod) → store
Import  → Markdown → mdast (remark) → canonical blocks → (same path as the editor)
```

## Authentication and authorization (`src/lib/auth/`)

- PBKDF2-SHA256 (100k iterations, the Cloudflare maximum) over an HMAC-peppered password; constant-time compare; dummy hash for unknown users.
- Opaque 256-bit session tokens in an HttpOnly, Secure, SameSite=Lax cookie (`__Host-` prefix on HTTPS). Only the SHA-256 is stored, so a database leak yields no usable cookies.
  7-day absolute and 12-hour idle expiry. Password change, disabling and logout delete rows (immediate revocation).
- CSRF: every state-changing admin request must be same-origin, JSON, and carry a per-session token derived with HMAC (`X-CSRF-Token`).
- Authorization is enforced **on the server** in every route (`requireApi`) and page (`requirePage`) with named actions (`can(user, action)`).
  Contributors may only touch draft articles that they started or that are assigned to them, and not while a draft is waiting in review; foreign articles answer 404.
  Planner/Collab records have an access policy in SQL (`visibility()` in `src/lib/store/planner.ts`: owner all; contributor with `collab.access`: assigned, created or shared).
  Accounts are created and passwords set or reset only by the owner (`users.manage`); there are no invitation tokens and no self-service password change for contributors.
- The owner is unique (a partial unique index), and the contributor-management functions can only ever modify `role = 'contributor'` rows.
- Brute force: per-IP and per-account limits stored in the database (hold across instances and across both deployments).

## Collaboration (`src/lib/store/planner.ts`, `workflow.ts`, `comments.ts`, `revisions.ts`, `activity.ts`)

Save-based, not real-time: there are no WebSockets, Durable Objects, polling or background jobs, so an idle admin costs nothing and nothing here can exhaust a free allowance by itself.

- **One record, three views.** `planner_records` is the single task table. Planner = every record; Collab = the records the viewer may see; Article Management = the linked `articles` row
  (`planner_records.article_id`, `articles.assigned_to`). Assigning, approving and publishing update both sides inside one store function, so they cannot drift apart.
- **Workflow** (`transition()`): contributor-allowed `start / submit / withdraw` on their own task; owner-only `request_revision / approve / complete / reopen / archive`. Publishing is a separate owner-only action and never happens as a side effect of a review step.
- **Conflicts**: articles and tasks carry an integer `version`; saves send `expectedVersion` and an `UPDATE ... WHERE version = ?` decides the winner. The loser gets HTTP 409 naming who changed it. Review steps do not change the content version.
- **Versions**: `article_revisions` stores a snapshot only when meaningful (see the admin guide), with content-hash de-duplication and retention caps.
- **Cheap reads**: the Planner/Collab pages load the viewer's records once (one batched read, capped at 500) and filter, sort and switch views in the browser; saved views are small JSON rows.

## Analytics (`src/lib/store/analytics.ts`, `analytics-rollup.ts`, `src/components/Tracker.tsx`)

`sendBeacon` page-view events → `/api/collect` → `events`; an engagement beacon is sent only for visits of 10 s or more. Visitor id = HMAC(IP + browser + day); the IP is never stored. Country/city from
platform headers. Bots, Do Not Track, Global Privacy Control and `/admin` are ignored.

Turso counts rows *scanned*, so dashboards do not re-aggregate raw events: a finished UTC day is summarised once, lazily, into `analytics_daily` (at most 8 missing days per request; today is aggregated live from
the small slice since midnight). Raw events are deleted after 90 days, and only for days that have been summarised. Visit-table totals are capped at 10,000 and flagged as "10,000+".

## Caching

- Vercel: `Cache-Control: s-maxage=300, stale-while-revalidate=86400` on public pages (`next.config.ts`): a rendering is reused for 5 minutes and an older one may be served for a day while it refreshes.
- Cloudflare: `custom-worker.ts` stores HTML/RSS/sitemap responses in the edge cache for 5 minutes (keyed by deployment) plus a second 24-hour copy that is served only when rendering fails (database down, quota reached, Worker error), marked `X-Served-Stale: 1`; `/media/*` is cached for a year.
  The edge cache only works on a custom domain, not on `*.workers.dev`.
- `/media/<id>` is content-addressed and immutable; `/_next/static/*` is immutable (`public/_headers` on Cloudflare).

## Known trade-offs

- Edits appear on the live site after the cache window (about 5 min), not instantly.
- Rendering on request costs CPU; on Cloudflare **free** (10 ms) an uncached page may exceed the limit (Error 1102). The cache absorbs most of it; the Workers Paid plan removes the risk.
- Images in the database are fine for a publication (hundreds of images); a very image-heavy site should move them to object storage (R2/S3) behind the same `/media` route.
