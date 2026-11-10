# VierApparatus

An independent science publication: articles, topics, an editorial admin area with a visual editor and Markdown import,
contributor proposals, and privacy-friendly analytics. Built with Next.js (App Router), TypeScript and Tailwind, with one
shared [Turso](https://turso.tech) (libSQL) database, and deployable to **Vercel** and **Cloudflare Workers** from the same code.

> The old laboratory-equipment catalogue is switched off (not deleted). See [Feature flag](#product-catalogue-feature-flag).
> Procurement-era content is preserved in [`archive/`](archive/procurement-2026-11-06/README.md), outside everything that is built.

## Contents

- [Quick start (local)](#quick-start-local)
- [Commands](#commands)
- [How it works](#how-it-works)
- [Environment variables](#environment-variables)
- [First sign-in and the owner account](#first-sign-in-and-the-owner-account)
- [Publishing guide](docs/ADMIN-GUIDE.md) · [Architecture](docs/ARCHITECTURE.md) · [Deployment](docs/DEPLOYMENT.md)
- [Security notes and known limits](#security-notes-and-known-limits)

## Quick start (local)

```bash
npm install
# 1. A local throw-away database (no Turso account needed). PowerShell: $env:NAME="value"
export LOCAL_DB=1 TURSO_DATABASE_URL=file:./.data/dev.db AUTH_SECRET=local-development-secret-at-least-32-characters
npm run db:migrate            # creates the tables
npm run admin:bootstrap       # asks for the owner e-mail, name and a TEMPORARY password (typed hidden, never stored)
npm run content:seed          # optional: imports the 3 science articles from content/articles into the database
npm run dev                   # http://localhost:3000   admin: http://localhost:3000/admin
```

`next dev` automatically uses the local SQLite file from `.env.development.local`
(`TURSO_DATABASE_URL=file:./.data/dev.db`); production builds use Turso over HTTPS.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Next.js development server / production build / production server. |
| `npm run check` | Typecheck, lint and all tests (run this before every deploy). |
| `npm test` | Unit and API tests (119): content model, importer, auth, permissions, CSRF, stores, forms, analytics, SEO. |
| `npm run test:web-client` | The same tests, but through the **production** database client (HTTP) against a local stand-in for Turso (`scripts/mock-turso.mjs`, started and stopped automatically). |
| `npm run mock:turso` | Starts that stand-in by hand (port 8099) so you can run a production build against it: `TURSO_DATABASE_URL=http://127.0.0.1:8099`. A test tool, not a database. |
| `node scripts/e2e-admin.mjs <url> <email> <temp-password> [1\|2]` | Real-browser end-to-end test (83 checks) of the public site and the whole admin area against a **throw-away** database; part `1` then `2` for small machines. See the script header. |
| `npm run db:migrate` | Creates/upgrades the database tables (also done automatically on the first request). |
| `npm run admin:bootstrap` | One-time creation of the owner account. |
| `npm run modules:seed` | Installs the learning platform's structure: six subjects, Biology's 35 specializations, every specialization's levels, the General Biology curriculum (232 modules) and a Planner task per module. No lesson text. Safe to repeat. |
| `npm run products:legacy` | Imports the old catalogue (`data/products.json`) into the Product Manager: BIOBASE published, all others archived. Safe to repeat. |
| `npm run templates:build` | Rewrites `public/templates/` (module Markdown template, product import CSV). |
| `npm run content:seed` | Imports `content/articles/*.md` into the database (safe to repeat). |
| `npm run indexnow -- --since-last` | Manual IndexNow catch-up. Publishing in the admin already notifies IndexNow on the real domain. |
| `node scripts/sync-cloudflare.mjs [--dry-run]` | Copies the shared code to the Cloudflare folder (see [Two deployments](#two-deployments-one-codebase)). |

## How it works

- **Articles live in the database**, not in Git. Publishing, editing and deleting from `/admin` needs no commit or redeploy.
- **One canonical article format.** The visual editor edits it directly, and the Markdown importer compiles into it
  (`src/lib/content/`). One renderer and one `ArticleView` component produce the public page, the admin preview and the
  editor's live preview, so an article looks the same however it was made. No raw HTML is ever stored.
- **Public pages** are rendered on request from the database and cached at the edge for a short time
  (about a minute on Vercel, five minutes on Cloudflare). A publish is therefore visible within minutes.
- **Admin** (`/admin`) is server-protected: sessions in the database, HttpOnly cookies, per-session CSRF tokens, rate limits,
  and every API route re-checks the caller's permissions. Roles: **owner** (everything) and **contributor** (own drafts only).
- **Analytics** are first-party and cookieless (no IP addresses stored); shown at `/admin/analytics` with a filterable table.
- **Images** are resized in the browser, stored in the database and served from `/media/<id>` with a one-year cache header.

### Two deployments, one codebase

`vierapparatus/` (Vercel) is the source of truth. `VierApparatus-Cloudflare page/` is the same code plus Cloudflare files
(`wrangler.jsonc`, `open-next.config.ts`, `custom-worker.ts`, `public/_headers`, `README-CLOUDFLARE.md`). After changing shared
code, run `node scripts/sync-cloudflare.mjs` from the Vercel folder. It copies everything shared, merges `package.json`
(keeping the Cloudflare-only dependencies and scripts) and never touches the Cloudflare-specific files.
`next.config.ts` is identical in both: it detects Cloudflare by the presence of `open-next.config.ts`.

### Learning modules: subject, specialization, level

`/module` is generated entirely from the database: a main subject (Biology, Chemistry, ...), then a **specialization** (General Biology, Bioinformatics, ...), then an academic level, a module and its chapters. A specialization is a row of `module_subjects` whose `parent_id` is its subject. Subjects, specializations, levels, their order, cover images, publication and shared modules are edited at `/admin/curriculum`; changing an address leaves a permanent redirect (`module_redirects`). A module is written in the Module Editor, which imports, exports and templates Markdown (`public/templates/module-template.md`).

### Product reviews

`/products` is a review and curation platform (no prices, no cart): the disclaimer first, then the invitation to manufacturers (its button opens `/contact?type=Product%20submission`), then the published entries. Products live in the database (`products`, `product_categories`, `product_comments`) and are managed at `/admin/products` (editable table, full editor, CSV and copy-paste import, moderation of comments). Workflow: Draft, Under review, Approved, Published; also Archived and Rejected. Visitor comments are protected by a self-hosted human check (`src/lib/captcha.ts`), a honeypot, timing, rate limits and spam signals, and are public only after approval. The old static catalogue (10,319 records) is imported once with `npm run products:legacy` (BIOBASE stays published, the rest is archived); its code is kept in `archive/procurement-2026-11-10/`. The import template is `public/templates/product-import-template.csv` (rebuild both templates with `npm run templates:build`).

## Environment variables

See [`.env.example`](.env.example) for the annotated list.

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public, build time | Canonical address of the site (sitemap, canonical links, Open Graph, IndexNow). |
| `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` | server secret | The shared database. Same values on both deployments. |
| `AUTH_SECRET` | server secret (32+ chars) | Mixed into password hashes, CSRF tokens and visitor ids. **Same on both deployments and when bootstrapping.** |
| `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL` | server, optional | E-mail notification of messages and proposals. Everything is stored in the database regardless. |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET` | server secret, optional | Store uploaded images in Cloudflare R2 through its S3 API (Vercel, or a PC testing the real bucket). On Cloudflare use the `IMAGES` binding instead (see README-CLOUDFLARE.md). With neither, images stay in the database. |
| `IMAGE_PUBLIC_BASE_URL` | server, optional | Public address of the image bucket. Default `https://image.vierapparatus.com`. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | server, optional | Shared rate limit for the page-view beacon. |
| `LOCAL_DB` | local only | Use the Node SQLite client for `file:` databases. Never set in production. |
| `OWNER_BOOTSTRAP_EMAIL/NAME/PASSWORD` | CLI only | Non-interactive `admin:bootstrap`. Never put these in Vercel or Cloudflare. |

## First sign-in and the owner account

1. Put `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` and `AUTH_SECRET` in `.env.local` (the same values you will give the deployments).
2. `npm run admin:bootstrap`: enter `info@vierapparatus.com`, a name, and your **temporary** password at the hidden prompt. It is hashed
   immediately; it is never written to a file, a log or the repository.
3. Sign in at `/admin`. You are taken straight to **Change password**. The temporary password stops working the moment you save a
   new one, and every other session is signed out.
4. Contributors are created by you in **Admin → Contributors → Add contributor** (name, e-mail, a password you choose, what they may do). There is
   no public sign-up and no invitation link, and contributors cannot change passwords: you reset them. A contributor can never publish, see
   analytics, manage users or change settings. See `docs/ADMIN-GUIDE.md`.

## Security notes and known limits

- **Passwords**: PBKDF2-SHA256, 100,000 iterations (the maximum Cloudflare Workers allows) plus a server-side pepper. Strong enough with
  the policy and rate limits used, but below the current OWASP figure for PBKDF2; use a long passphrase. On the Cloudflare **free** plan the
  10 ms CPU limit may reject the login request; use the Workers Paid plan or sign in via the Vercel deployment (same database).
- **CSP** still needs `'unsafe-inline'` for scripts (Next.js bootstrap scripts); article content cannot add scripts, and images may come from any HTTPS host.
- **Analytics**: "unique visitors" are counted once per day (cookieless); a returning visitor on another day counts again.
- **Nothing here has been deployed or tested against a real Turso database, Vercel or Cloudflare** from this workspace; local tests use SQLite files
  and the real production build running locally.
