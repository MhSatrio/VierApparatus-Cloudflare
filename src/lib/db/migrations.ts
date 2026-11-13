import type { Client } from "@libsql/client/web";

/**
 * Schema migrations. Each entry runs once, in order, inside one batch (a transaction). Never edit an applied entry:
 * add a new one. Statements are written to be idempotent as well, so a half-finished run can be repeated.
 */
export const MIGRATIONS: { version: number; statements: string[] }[] = [
  {
    version: 1,
    statements: [
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE COLLATE NOCASE,
        name TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('owner','contributor')),
        password_hash TEXT NOT NULL,
        must_change_password INTEGER NOT NULL DEFAULT 0,
        permissions TEXT NOT NULL DEFAULT '[]',
        disabled INTEGER NOT NULL DEFAULT 0,
        bio TEXT NOT NULL DEFAULT '',
        invited_by TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        last_login_at TEXT,
        password_changed_at TEXT
      )`,
      // At most one owner row can ever exist.
      `CREATE UNIQUE INDEX IF NOT EXISTS users_one_owner ON users(role) WHERE role = 'owner'`,
      `CREATE TABLE IF NOT EXISTS sessions (
        id_hash TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TEXT NOT NULL,
        last_seen_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        user_agent TEXT NOT NULL DEFAULT ''
      )`,
      `CREATE INDEX IF NOT EXISTS sessions_user ON sessions(user_id)`,
      `CREATE TABLE IF NOT EXISTS invites (
        token_hash TEXT PRIMARY KEY,
        email TEXT NOT NULL COLLATE NOCASE,
        name TEXT NOT NULL,
        permissions TEXT NOT NULL DEFAULT '[]',
        created_by TEXT NOT NULL,
        created_at TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        used_at TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS rate_limits (
        key TEXT PRIMARY KEY,
        count INTEGER NOT NULL,
        reset_at INTEGER NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL UNIQUE COLLATE NOCASE,
        description TEXT NOT NULL DEFAULT '',
        sort INTEGER NOT NULL DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS media (
        id TEXT PRIMARY KEY,
        mime TEXT NOT NULL,
        size INTEGER NOT NULL,
        width INTEGER,
        height INTEGER,
        sha256 TEXT NOT NULL,
        alt TEXT NOT NULL DEFAULT '',
        data BLOB NOT NULL,
        created_by TEXT,
        created_at TEXT NOT NULL
      )`,
      `CREATE UNIQUE INDEX IF NOT EXISTS media_sha ON media(sha256)`,
      `CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL DEFAULT '',
        category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
        author_name TEXT NOT NULL,
        author_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
        doc TEXT NOT NULL,
        html TEXT NOT NULL DEFAULT '',
        body_text TEXT NOT NULL DEFAULT '',
        has_math INTEGER NOT NULL DEFAULT 0,
        cover_url TEXT,
        cover_alt TEXT NOT NULL DEFAULT '',
        cover_credit TEXT NOT NULL DEFAULT '',
        cover_width INTEGER,
        cover_height INTEGER,
        tags TEXT NOT NULL DEFAULT '[]',
        seo_title TEXT NOT NULL DEFAULT '',
        seo_description TEXT NOT NULL DEFAULT '',
        reading_minutes INTEGER NOT NULL DEFAULT 1,
        featured INTEGER NOT NULL DEFAULT 0,
        submitted_for_review INTEGER NOT NULL DEFAULT 0,
        source TEXT NOT NULL DEFAULT 'editor',
        version INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        published_at TEXT,
        archived_at TEXT
      )`,
      `CREATE INDEX IF NOT EXISTS articles_status_published ON articles(status, published_at DESC)`,
      `CREATE INDEX IF NOT EXISTS articles_category ON articles(category_id)`,
      `CREATE INDEX IF NOT EXISTS articles_author ON articles(author_id)`,
      `CREATE TABLE IF NOT EXISTS gone_slugs (
        slug TEXT PRIMARY KEY,
        deleted_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS attachments (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        filename TEXT NOT NULL,
        mime TEXT NOT NULL,
        size INTEGER NOT NULL,
        data BLOB NOT NULL,
        created_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS submissions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        title TEXT NOT NULL,
        topic TEXT NOT NULL DEFAULT '',
        proposal TEXT NOT NULL,
        background TEXT NOT NULL DEFAULT '',
        links TEXT NOT NULL DEFAULT '',
        attachment_id TEXT REFERENCES attachments(id) ON DELETE SET NULL,
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected','revision')),
        owner_note TEXT NOT NULL DEFAULT '',
        article_id TEXT REFERENCES articles(id) ON DELETE SET NULL,
        created_at TEXT NOT NULL,
        reviewed_at TEXT
      )`,
      `CREATE INDEX IF NOT EXISTS submissions_status ON submissions(status, created_at DESC)`,
      `CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        extra TEXT NOT NULL DEFAULT '{}',
        attachment_id TEXT REFERENCES attachments(id) ON DELETE SET NULL,
        status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','read','archived')),
        created_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS inquiries_status ON inquiries(status, created_at DESC)`,
      `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ts TEXT NOT NULL,
        visitor_id TEXT NOT NULL,
        session_id TEXT NOT NULL,
        type TEXT NOT NULL,
        path TEXT NOT NULL,
        landing INTEGER NOT NULL DEFAULT 0,
        referrer TEXT NOT NULL DEFAULT '',
        referrer_host TEXT NOT NULL DEFAULT '',
        utm_source TEXT NOT NULL DEFAULT '',
        utm_medium TEXT NOT NULL DEFAULT '',
        utm_campaign TEXT NOT NULL DEFAULT '',
        utm_content TEXT NOT NULL DEFAULT '',
        utm_term TEXT NOT NULL DEFAULT '',
        country TEXT NOT NULL DEFAULT '',
        city TEXT NOT NULL DEFAULT '',
        device TEXT NOT NULL DEFAULT '',
        browser TEXT NOT NULL DEFAULT '',
        duration_ms INTEGER,
        scroll_pct INTEGER
      )`,
      `CREATE INDEX IF NOT EXISTS events_ts ON events(ts)`,
      `CREATE INDEX IF NOT EXISTS events_path_ts ON events(path, ts)`,
      `CREATE INDEX IF NOT EXISTS events_visitor ON events(visitor_id, ts)`,
      `CREATE TABLE IF NOT EXISTS audit_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ts TEXT NOT NULL,
        user_id TEXT,
        action TEXT NOT NULL,
        detail TEXT NOT NULL DEFAULT ''
      )`,
    ],
  },
  {
    version: 2,
    statements: [
      `CREATE TABLE IF NOT EXISTS slug_redirects (
        old_slug TEXT PRIMARY KEY,
        article_id TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )`,
      // Starting set of topics. The owner can rename, add and remove them in the admin area.
      ...[
        ["biotechnology", "Biotechnology", 1],
        ["molecular-biology", "Molecular Biology", 2],
        ["microbiology", "Microbiology", 3],
        ["biochemistry", "Biochemistry", 4],
        ["scientific-methodology", "Scientific Methodology", 5],
        ["research-techniques", "Research Techniques", 6],
        ["environmental-science", "Environmental Science", 7],
        ["scientific-commentary", "Scientific Commentary", 8],
        ["science-and-society", "Science & Society", 9],
      ].map(([slug, name, sort]) => `INSERT OR IGNORE INTO categories(id, slug, name, description, sort) VALUES ('cat_${slug}', '${slug}', '${String(name).replace(/'/g, "''")}', '', ${sort})`),
    ],
  },
  {
    version: 3,
    statements: [
      // ---- accounts created by the owner
      `ALTER TABLE users ADD COLUMN specialization TEXT NOT NULL DEFAULT ''`,
      `ALTER TABLE users ADD COLUMN last_active_at TEXT`,
      // ---- articles: assignment, review state, last editor
      `ALTER TABLE articles ADD COLUMN assigned_to TEXT`,
      `ALTER TABLE articles ADD COLUMN review_status TEXT NOT NULL DEFAULT 'none'`,
      `ALTER TABLE articles ADD COLUMN last_editor_id TEXT`,
      `ALTER TABLE articles ADD COLUMN last_editor_name TEXT NOT NULL DEFAULT ''`,
      `UPDATE articles SET review_status = 'requested' WHERE submitted_for_review = 1`,
      `UPDATE articles SET last_editor_name = author_name, last_editor_id = author_id`,
      `CREATE INDEX IF NOT EXISTS articles_assigned ON articles(assigned_to)`,
      // ---- article planner (also the Collab task table: one record, one source of truth)
      `CREATE TABLE IF NOT EXISTS planner_fields (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('text','longtext','number','date','select','checkbox','url')),
        options TEXT NOT NULL DEFAULT '[]',
        sort INTEGER NOT NULL DEFAULT 0
      )`,
      `CREATE TABLE IF NOT EXISTS planner_records (
        id TEXT PRIMARY KEY,
        num INTEGER NOT NULL UNIQUE,
        title TEXT NOT NULL,
        brief TEXT NOT NULL DEFAULT '',
        topic_id TEXT,
        status TEXT NOT NULL DEFAULT 'idea' CHECK (status IN ('idea','planned','in_progress','in_review','revision','approved','done','archived')),
        priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent')),
        due_date TEXT,
        assigned_to TEXT,
        shared_with TEXT NOT NULL DEFAULT '[]',
        article_id TEXT,
        research_notes TEXT NOT NULL DEFAULT '',
        notes TEXT NOT NULL DEFAULT '',
        custom TEXT NOT NULL DEFAULT '{}',
        created_by TEXT NOT NULL,
        updated_by TEXT NOT NULL,
        version INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS planner_assigned ON planner_records(assigned_to, status)`,
      `CREATE INDEX IF NOT EXISTS planner_updated ON planner_records(updated_at DESC)`,
      `CREATE UNIQUE INDEX IF NOT EXISTS planner_article ON planner_records(article_id) WHERE article_id IS NOT NULL`,
      `CREATE TABLE IF NOT EXISTS planner_views (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        name TEXT NOT NULL,
        kind TEXT NOT NULL DEFAULT 'table' CHECK (kind IN ('table','kanban','ticket')),
        config TEXT NOT NULL DEFAULT '{}',
        scope TEXT NOT NULL DEFAULT 'planner',
        created_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS planner_views_user ON planner_views(user_id)`,
      // ---- comments (threaded, one level) and activity
      `CREATE TABLE IF NOT EXISTS comments (
        id TEXT PRIMARY KEY,
        record_id TEXT,
        article_id TEXT,
        parent_id TEXT,
        author_id TEXT,
        author_name TEXT NOT NULL,
        body TEXT NOT NULL,
        resolved INTEGER NOT NULL DEFAULT 0,
        resolved_by TEXT,
        resolved_at TEXT,
        created_at TEXT NOT NULL,
        edited_at TEXT
      )`,
      `CREATE INDEX IF NOT EXISTS comments_record ON comments(record_id, created_at)`,
      `CREATE INDEX IF NOT EXISTS comments_article ON comments(article_id, created_at)`,
      `CREATE TABLE IF NOT EXISTS activity (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ts TEXT NOT NULL,
        actor_id TEXT,
        actor_name TEXT NOT NULL DEFAULT '',
        record_id TEXT,
        article_id TEXT,
        action TEXT NOT NULL,
        detail TEXT NOT NULL DEFAULT ''
      )`,
      `CREATE INDEX IF NOT EXISTS activity_record ON activity(record_id, id DESC)`,
      `CREATE INDEX IF NOT EXISTS activity_article ON activity(article_id, id DESC)`,
      `CREATE INDEX IF NOT EXISTS activity_recent ON activity(id DESC)`,
      // ---- article revisions (meaningful saves only; capped per article)
      `CREATE TABLE IF NOT EXISTS article_revisions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        article_id TEXT NOT NULL,
        version INTEGER NOT NULL,
        kind TEXT NOT NULL DEFAULT 'auto',
        editor_id TEXT,
        editor_name TEXT NOT NULL DEFAULT '',
        note TEXT NOT NULL DEFAULT '',
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL DEFAULT '',
        doc TEXT NOT NULL,
        doc_hash TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS revisions_article ON article_revisions(article_id, id DESC)`,
      `CREATE INDEX IF NOT EXISTS events_session ON events(session_id)`, // the visits table looks up per-session details by session id
      // ---- analytics roll-ups: a finished day is summarised once, so dashboards never re-scan raw events
      `CREATE TABLE IF NOT EXISTS analytics_daily (
        day TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        computed_at TEXT NOT NULL
      )`,
    ],
  },
  {
    // ---- sponsorship (new tables only; nothing existing is changed). Campaigns run site-wide; article sponsorships override them.
    version: 4,
    statements: [
      `CREATE TABLE IF NOT EXISTS sponsor_campaigns (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        image_url TEXT NOT NULL,
        destination_url TEXT NOT NULL,
        campaign TEXT NOT NULL DEFAULT '',
        active INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS sponsor_campaigns_active ON sponsor_campaigns(active, created_at)`,
      `CREATE TABLE IF NOT EXISTS article_sponsorships (
        article_id TEXT PRIMARY KEY,
        enabled INTEGER NOT NULL DEFAULT 0,
        image_url TEXT NOT NULL DEFAULT '',
        destination_url TEXT NOT NULL DEFAULT '',
        campaign TEXT NOT NULL DEFAULT '',
        updated_at TEXT NOT NULL
      )`,
    ],
  },
  {
    // ---- newsletter subscribers (new table only). Tokens are stored as hashes, never in clear.
    version: 5,
    statements: [
      `CREATE TABLE IF NOT EXISTS subscribers (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL DEFAULT '',
        interests TEXT NOT NULL DEFAULT '[]',
        status TEXT NOT NULL DEFAULT 'pending',
        source TEXT NOT NULL DEFAULT 'popup',
        consent_at TEXT,
        confirmed_at TEXT,
        unsubscribed_at TEXT,
        confirm_hash TEXT,
        confirm_expires_at TEXT,
        unsubscribe_hash TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS subscribers_status ON subscribers(status, created_at)`,
    ],
  },
  {
    // ---- calendar feeds (new table only). One private link per person; only its SHA-256 hash is stored.
    version: 6,
    statements: [
      `CREATE TABLE IF NOT EXISTS calendar_feeds (
        user_id TEXT PRIMARY KEY,
        token_hash TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL,
        rotated_at TEXT NOT NULL
      )`,
    ],
  },
  {
    // ---- bot counts (new table only). Bot visits are never stored as visits; each day only gets a count, so the dashboard can
    // show how much automated traffic was filtered out. Nothing existing is changed or back-filled (bots were not kept before).
    version: 7,
    statements: [
      `CREATE TABLE IF NOT EXISTS bot_daily (
        day TEXT PRIMARY KEY,
        hits INTEGER NOT NULL DEFAULT 0
      )`,
    ],
  },
  {
    // ---- learning modules, image metadata, planner content types. New tables, plus two columns with defaults on
    // planner_records (so the previous code keeps working against this schema: it simply ignores them).
    version: 8,
    statements: [
      // Metadata for images stored by the upload service (Cloudflare R2, or the database when R2 is not configured).
      `CREATE TABLE IF NOT EXISTS image_assets (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL CHECK (kind IN ('articles','modules','products','sponsors')),
        storage TEXT NOT NULL CHECK (storage IN ('r2','database')),
        object_key TEXT NOT NULL,
        url TEXT NOT NULL,
        thumb_key TEXT,
        thumb_url TEXT,
        mime TEXT NOT NULL DEFAULT 'image/webp',
        size INTEGER NOT NULL,
        width INTEGER NOT NULL,
        height INTEGER NOT NULL,
        thumb_width INTEGER,
        thumb_height INTEGER,
        thumb_size INTEGER,
        sha256 TEXT NOT NULL,
        original_name TEXT NOT NULL DEFAULT '',
        alt TEXT NOT NULL DEFAULT '',
        created_by TEXT,
        created_at TEXT NOT NULL
      )`,
      `CREATE UNIQUE INDEX IF NOT EXISTS image_assets_sha ON image_assets(sha256)`,
      `CREATE INDEX IF NOT EXISTS image_assets_created ON image_assets(created_at DESC)`,
      // The learning platform: subject -> level -> discipline -> module -> chapter -> subchapter, in one self-referencing table.
      `CREATE TABLE IF NOT EXISTS module_subjects (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        tagline TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        accent TEXT NOT NULL DEFAULT 'brand',
        sort INTEGER NOT NULL DEFAULT 0,
        published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS module_levels (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL REFERENCES module_subjects(id) ON DELETE CASCADE,
        slug TEXT NOT NULL,
        num INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        sort INTEGER NOT NULL DEFAULT 0,
        UNIQUE (subject_id, slug)
      )`,
      `CREATE TABLE IF NOT EXISTS modules (
        id TEXT PRIMARY KEY,
        subject_id TEXT NOT NULL REFERENCES module_subjects(id) ON DELETE CASCADE,
        level_id TEXT NOT NULL REFERENCES module_levels(id) ON DELETE CASCADE,
        parent_id TEXT REFERENCES modules(id) ON DELETE CASCADE,
        kind TEXT NOT NULL CHECK (kind IN ('discipline','module','chapter')),
        slug TEXT NOT NULL,
        title TEXT NOT NULL,
        summary TEXT NOT NULL DEFAULT '',
        sort INTEGER NOT NULL DEFAULT 0,
        objectives TEXT NOT NULL DEFAULT '[]',
        prerequisites TEXT NOT NULL DEFAULT '[]',
        refs TEXT NOT NULL DEFAULT '[]',
        doc TEXT NOT NULL DEFAULT '{"version":1,"blocks":[]}',
        html TEXT NOT NULL DEFAULT '',
        headings TEXT NOT NULL DEFAULT '[]',
        body_text TEXT NOT NULL DEFAULT '',
        has_math INTEGER NOT NULL DEFAULT 0,
        reading_minutes INTEGER NOT NULL DEFAULT 0,
        content_status TEXT NOT NULL DEFAULT 'not_started' CHECK (content_status IN ('not_started','outlined','drafting','scientific_review','final')),
        status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
        version INTEGER NOT NULL DEFAULT 1,
        last_editor_name TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        published_at TEXT
      )`,
      // Slugs are unique where they appear in a URL: modules within a level, chapters within their parent, disciplines within a level.
      `CREATE UNIQUE INDEX IF NOT EXISTS modules_module_slug ON modules(level_id, slug) WHERE kind = 'module'`,
      `CREATE UNIQUE INDEX IF NOT EXISTS modules_chapter_slug ON modules(parent_id, slug) WHERE kind = 'chapter'`,
      `CREATE UNIQUE INDEX IF NOT EXISTS modules_discipline_slug ON modules(level_id, slug) WHERE kind = 'discipline'`,
      `CREATE INDEX IF NOT EXISTS modules_level ON modules(level_id, sort)`,
      `CREATE INDEX IF NOT EXISTS modules_parent ON modules(parent_id, sort)`,
      // Planner: every task is an article task (the default, so all existing rows stay as they are) or a module task.
      `ALTER TABLE planner_records ADD COLUMN content_type TEXT NOT NULL DEFAULT 'article'`,
      `ALTER TABLE planner_records ADD COLUMN module_id TEXT`,
      `CREATE INDEX IF NOT EXISTS planner_type ON planner_records(content_type, num)`,
      `CREATE UNIQUE INDEX IF NOT EXISTS planner_module ON planner_records(module_id) WHERE module_id IS NOT NULL`,
    ],
  },
  {
    version: 9,
    // Subject -> specialization -> level -> module. A specialization is a row of module_subjects whose parent_id is its subject, so
    // the levels and modules that already point at module_subjects(id) keep working without rebuilding any table.
    statements: moduleHierarchyStatements(),
  },
  {
    version: 10,
    // Product reviews: a managed catalogue (the old static catalogue is imported by scripts/products-import.ts), reader comments with
    // moderation history, and the import log. Page texts (disclaimer, invitation) live in the settings table.
    statements: [
      `CREATE TABLE IF NOT EXISTS product_categories (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL COLLATE NOCASE UNIQUE,
        description TEXT NOT NULL DEFAULT '',
        sort INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        num INTEGER NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        manufacturer TEXT NOT NULL DEFAULT '',
        model_number TEXT NOT NULL DEFAULT '',
        sku TEXT NOT NULL DEFAULT '',
        category_id TEXT REFERENCES product_categories(id),
        short_description TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL DEFAULT '',
        specs TEXT NOT NULL DEFAULT '[]',
        features TEXT NOT NULL DEFAULT '[]',
        applications TEXT NOT NULL DEFAULT '[]',
        advantages TEXT NOT NULL DEFAULT '[]',
        limitations TEXT NOT NULL DEFAULT '[]',
        certifications TEXT NOT NULL DEFAULT '[]',
        image_url TEXT NOT NULL DEFAULT '',
        thumb_url TEXT NOT NULL DEFAULT '',
        gallery TEXT NOT NULL DEFAULT '[]',
        documents TEXT NOT NULL DEFAULT '[]',
        product_url TEXT NOT NULL DEFAULT '',
        manufacturer_url TEXT NOT NULL DEFAULT '',
        datasheet_url TEXT NOT NULL DEFAULT '',
        refs TEXT NOT NULL DEFAULT '[]',
        editorial_review TEXT NOT NULL DEFAULT '',
        editorial_notes TEXT NOT NULL DEFAULT '',
        review_status TEXT NOT NULL DEFAULT 'listed' CHECK (review_status IN ('listed','in_review','reviewed')),
        status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','under_review','approved','published','archived','rejected')),
        seo_title TEXT NOT NULL DEFAULT '',
        seo_description TEXT NOT NULL DEFAULT '',
        origin TEXT NOT NULL DEFAULT 'manual',
        legacy_id TEXT UNIQUE,
        legacy_data TEXT NOT NULL DEFAULT '{}',
        search TEXT NOT NULL DEFAULT '',
        version INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        published_at TEXT,
        updated_by TEXT
      )`,
      // an address a product had before it was changed keeps working
      `CREATE TABLE IF NOT EXISTS product_redirects (
        old_slug TEXT PRIMARY KEY,
        product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE
      )`,
      `CREATE UNIQUE INDEX IF NOT EXISTS products_num ON products(num)`,
      `CREATE INDEX IF NOT EXISTS products_status_name ON products(status, name COLLATE NOCASE)`,
      `CREATE INDEX IF NOT EXISTS products_category ON products(category_id, status)`,
      `CREATE INDEX IF NOT EXISTS products_manufacturer ON products(manufacturer COLLATE NOCASE)`,
      `CREATE INDEX IF NOT EXISTS products_updated ON products(updated_at DESC)`,
      `CREATE TABLE IF NOT EXISTS product_comments (
        id TEXT PRIMARY KEY,
        product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        display_name TEXT NOT NULL,
        affiliation TEXT NOT NULL DEFAULT '',
        org_address TEXT NOT NULL DEFAULT '',
        role TEXT NOT NULL DEFAULT '',
        body TEXT NOT NULL,
        rating INTEGER CHECK (rating BETWEEN 1 AND 5),
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','spam')),
        flags TEXT NOT NULL DEFAULT '[]',
        affiliation_verified INTEGER NOT NULL DEFAULT 0,
        verified_by TEXT,
        verified_at TEXT,
        body_hash TEXT NOT NULL DEFAULT '',
        ip_hash TEXT NOT NULL DEFAULT '',
        edited INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        moderated_at TEXT,
        moderated_by TEXT
      )`,
      `CREATE INDEX IF NOT EXISTS product_comments_product ON product_comments(product_id, status, created_at DESC)`,
      `CREATE INDEX IF NOT EXISTS product_comments_status ON product_comments(status, created_at DESC)`,
      `CREATE INDEX IF NOT EXISTS product_comments_hash ON product_comments(body_hash)`,
      `CREATE TABLE IF NOT EXISTS product_comment_log (
        id TEXT PRIMARY KEY,
        comment_id TEXT NOT NULL REFERENCES product_comments(id) ON DELETE CASCADE,
        actor_id TEXT,
        actor_name TEXT NOT NULL DEFAULT '',
        action TEXT NOT NULL,
        note TEXT NOT NULL DEFAULT '',
        at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS product_comment_log_comment ON product_comment_log(comment_id, at)`,
      `CREATE TABLE IF NOT EXISTS product_imports (
        id TEXT PRIMARY KEY,
        actor_id TEXT,
        actor_name TEXT NOT NULL DEFAULT '',
        source TEXT NOT NULL,
        filename TEXT NOT NULL DEFAULT '',
        rows_total INTEGER NOT NULL DEFAULT 0,
        created INTEGER NOT NULL DEFAULT 0,
        updated INTEGER NOT NULL DEFAULT 0,
        skipped INTEGER NOT NULL DEFAULT 0,
        failed INTEGER NOT NULL DEFAULT 0,
        errors TEXT NOT NULL DEFAULT '[]',
        created_at TEXT NOT NULL
      )`,
    ],
  },
  {
    version: 11,
    // Who added a product: a contributor can edit only the products they added (migration 11).
    statements: [`ALTER TABLE products ADD COLUMN created_by TEXT`, `CREATE INDEX IF NOT EXISTS products_created_by ON products(created_by)`],
  },
  {
    version: 12,
    // Reference check (APA references checked against Crossref before publication). Articles get a reference list of their own;
    // modules already have one (`refs`). Both record the last check: its status (not_checked / pass / fail), the fingerprint of the
    // list it checked, the per-reference report and when it ran. Additive only; existing rows get "not checked".
    statements: [
      `ALTER TABLE articles ADD COLUMN refs TEXT NOT NULL DEFAULT '[]'`,
      `ALTER TABLE articles ADD COLUMN refcheck_status TEXT NOT NULL DEFAULT 'not_checked'`,
      `ALTER TABLE articles ADD COLUMN refcheck_hash TEXT NOT NULL DEFAULT ''`,
      `ALTER TABLE articles ADD COLUMN refcheck_report TEXT NOT NULL DEFAULT '[]'`,
      `ALTER TABLE articles ADD COLUMN refcheck_at TEXT`,
      `ALTER TABLE modules ADD COLUMN refcheck_status TEXT NOT NULL DEFAULT 'not_checked'`,
      `ALTER TABLE modules ADD COLUMN refcheck_hash TEXT NOT NULL DEFAULT ''`,
      `ALTER TABLE modules ADD COLUMN refcheck_report TEXT NOT NULL DEFAULT '[]'`,
      `ALTER TABLE modules ADD COLUMN refcheck_at TEXT`,
    ],
  },
  {
    version: 13,
    // Website connector (for the DCE desktop app): access tokens, the event outbox the app reads (articles published, products
    // published or reviewed) and the jobs the owner sends to it. Tokens are stored as SHA-256 hashes only. Additive only.
    statements: [
      `CREATE TABLE IF NOT EXISTS connector_tokens (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        token_hash TEXT NOT NULL UNIQUE,
        scopes TEXT NOT NULL DEFAULT '[]',
        created_by TEXT,
        created_at TEXT NOT NULL,
        last_used_at TEXT,
        last_seen_at TEXT,
        client_cursor INTEGER NOT NULL DEFAULT 0,
        client_version TEXT NOT NULL DEFAULT '',
        client_message TEXT NOT NULL DEFAULT '',
        revoked_at TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS connector_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ts TEXT NOT NULL,
        type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        dedupe_key TEXT NOT NULL UNIQUE,
        payload TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS connector_events_type ON connector_events(type, id)`,
      `CREATE TABLE IF NOT EXISTS connector_jobs (
        id TEXT PRIMARY KEY,
        ts TEXT NOT NULL,
        created_by TEXT,
        type TEXT NOT NULL,
        target_id TEXT NOT NULL DEFAULT '',
        target_title TEXT NOT NULL DEFAULT '',
        payload TEXT NOT NULL,
        status TEXT NOT NULL CHECK (status IN ('pending', 'claimed', 'done', 'failed')),
        claimed_by TEXT,
        claimed_at TEXT,
        finished_at TEXT,
        result TEXT NOT NULL DEFAULT '',
        error TEXT NOT NULL DEFAULT ''
      )`,
      `CREATE INDEX IF NOT EXISTS connector_jobs_status ON connector_jobs(status, ts)`,
    ],
  },
];

/**
 * Statements of migration 9. The data moves are plain INSERT/UPDATE statements that do nothing on a database with no module rows,
 * so a fresh installation gets the new structure from the seed instead, and an installation that already has the old structure
 * is converted in place: nothing is deleted, every old address gets a permanent redirect.
 */
function moduleHierarchyStatements(): string[] {
  const GENERAL: [string, string][] = [
    ["bio", "General Biology"],
    ["chem", "General Chemistry"],
    ["phys", "General Physics"],
    ["math", "General Mathematics"],
    ["cs", "General Computer Science"],
    ["stats", "General Statistics"],
  ];
  const NOW = `strftime('%Y-%m-%dT%H:%M:%fZ','now')`;
  const out: string[] = [
    `ALTER TABLE module_subjects ADD COLUMN parent_id TEXT REFERENCES module_subjects(id)`,
    `ALTER TABLE module_subjects ADD COLUMN route_slug TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE module_subjects ADD COLUMN archived INTEGER NOT NULL DEFAULT 0`,
    `ALTER TABLE module_subjects ADD COLUMN cover_url TEXT NOT NULL DEFAULT ''`,
    `ALTER TABLE module_subjects ADD COLUMN cover_thumb_url TEXT NOT NULL DEFAULT ''`,
    `UPDATE module_subjects SET route_slug = slug WHERE route_slug = ''`,
    // the address segment is unique inside its parent; the old "slug" column stays as a globally unique internal key
    `CREATE UNIQUE INDEX IF NOT EXISTS module_subjects_route ON module_subjects(COALESCE(parent_id, ''), route_slug)`,
    `CREATE INDEX IF NOT EXISTS module_subjects_parent ON module_subjects(parent_id, sort)`,
    `CREATE TABLE IF NOT EXISTS module_redirects (
      from_path TEXT PRIMARY KEY,
      to_path TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`,
    // a module of one specialization can be listed in the contents of another level (shared foundations), without being copied
    `CREATE TABLE IF NOT EXISTS module_links (
      id TEXT PRIMARY KEY,
      level_id TEXT NOT NULL REFERENCES module_levels(id) ON DELETE CASCADE,
      module_id TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
      sort INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      UNIQUE (level_id, module_id)
    )`,
    `CREATE INDEX IF NOT EXISTS module_links_level ON module_links(level_id, sort)`,
  ];
  for (const [slug, name] of GENERAL) {
    const id = `ms_gen_${slug}`;
    const route = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    out.push(
      // 1. the old level addresses (/module/bio/foundations) now live under the general specialization
      `INSERT OR IGNORE INTO module_redirects(from_path, to_path, created_at)
         SELECT '/module/' || s.slug || '/' || l.slug, '/module/' || s.slug || '/${route}/' || l.slug, ${NOW}
         FROM module_levels l JOIN module_subjects s ON s.id = l.subject_id WHERE s.slug = '${slug}' AND s.parent_id IS NULL`,
      // 2. the general specialization, carrying the subject's own text
      `INSERT INTO module_subjects(id, slug, name, tagline, description, accent, sort, published, created_at, parent_id, route_slug)
         SELECT '${id}', '${slug}.${route}', '${name}', tagline, description, accent, 10, 1, created_at, id, '${route}'
         FROM module_subjects WHERE slug = '${slug}' AND parent_id IS NULL`,
      // 3. the subject's levels and modules move under it
      `UPDATE module_levels SET subject_id = '${id}' WHERE subject_id = (SELECT id FROM module_subjects WHERE slug = '${slug}' AND parent_id IS NULL)`,
      `UPDATE modules SET subject_id = '${id}' WHERE subject_id = (SELECT id FROM module_subjects WHERE slug = '${slug}' AND parent_id IS NULL)`,
    );
  }
  // Biomedical Sciences, Bioinformatics and Computational Biology were listed as subjects of their own: they are Biology specializations.
  const MOVED: [string, string, number][] = [
    ["biomed", "biomedical-sciences", 130],
    ["bioinf", "bioinformatics", 170],
    ["compbio", "computational-biology", 180],
  ];
  for (const [old, route, sort] of MOVED) {
    out.push(
      `INSERT OR IGNORE INTO module_redirects(from_path, to_path, created_at)
         SELECT '/module/${old}', '/module/bio/${route}', ${NOW} WHERE EXISTS (SELECT 1 FROM module_subjects WHERE slug = '${old}' AND parent_id IS NULL)`,
      `UPDATE module_subjects SET parent_id = (SELECT id FROM module_subjects WHERE slug = 'bio' AND parent_id IS NULL), route_slug = '${route}', slug = 'bio.${route}', sort = ${sort}
         WHERE slug = '${old}' AND parent_id IS NULL AND EXISTS (SELECT 1 FROM module_subjects WHERE slug = 'bio' AND parent_id IS NULL)`,
    );
  }
  return out;
}

const META =`CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)`;

const VERSION_SQL = "SELECT value FROM meta WHERE key = 'schema_version'";

async function readVersion(db: Pick<Client, "execute">): Promise<number> {
  const row = (await db.execute({ sql: VERSION_SQL, args: [] })).rows[0];
  return row ? Number(row.value) : 0;
}

/**
 * Brings the schema up to date. Several processes can start at the same time (the build's prerender workers, or two first
 * requests). Each pending migration runs in one write transaction that reads the version again inside it, so a process that
 * finds the migration already applied does nothing. Without this, two processes could both run the same ALTER TABLE and the
 * second would fail with "duplicate column name".
 */
export async function migrate(db: Client): Promise<void> {
  // A local SQLite file: wait for another connection's write instead of failing at once. Turso (HTTP) does not take this pragma.
  await db.execute("PRAGMA busy_timeout = 15000").catch(() => {});
  await db.execute(META);
  if ((await readVersion(db)) >= MIGRATIONS[MIGRATIONS.length - 1].version) return;
  for (const m of MIGRATIONS) await applyMigration(db, m);
}

const isBusy = (e: unknown) => /SQLITE_BUSY|database is locked/i.test(`${(e as { code?: unknown })?.code ?? ""} ${(e as { message?: unknown })?.message ?? ""}`);

/** One migration, in its own write transaction. A busy database (another connection is writing) is retried after a short random wait. */
async function applyMigration(db: Client, m: (typeof MIGRATIONS)[number]): Promise<void> {
  for (let attempt = 1; ; attempt++) {
    try {
      const tx = await db.transaction("write");
      try {
        if (m.version > (await readVersion(tx))) {
          for (const sql of m.statements) await tx.execute({ sql, args: [] as never[] });
          await tx.execute({ sql: "INSERT INTO meta(key, value) VALUES ('schema_version', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", args: [String(m.version)] });
        }
        await tx.commit();
        return;
      } catch (e) {
        await tx.rollback().catch(() => {});
        throw e;
      }
    } catch (e) {
      if (!isBusy(e) || attempt >= 60) throw e;
      await new Promise((r) => setTimeout(r, 20 + Math.random() * 120));
    }
  }
}
