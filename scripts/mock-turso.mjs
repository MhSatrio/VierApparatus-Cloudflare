// TEST TOOL ONLY. A local stand-in for Turso's HTTP API (the Hrana-over-HTTP "v2/pipeline" protocol), backed by Node's built-in
// SQLite. It lets the app's PRODUCTION database client (@libsql/client/web, the one Vercel and Cloudflare use) be exercised on a
// laptop, which a plain `file:` database cannot do. It is not a database server and must never be used in production.
//
//   node scripts/mock-turso.mjs [port] [path/to/file.db]      default: 8099 and .data/mock-turso.db
//   then: TURSO_DATABASE_URL=http://127.0.0.1:8099  (no TURSO_AUTH_TOKEN needed)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const port = Number(process.argv[2] ?? 8099);
const file = path.resolve(process.argv[3] ?? ".data/mock-turso.db");
fs.mkdirSync(path.dirname(file), { recursive: true });
const db = new DatabaseSync(file);
db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");

const toParam = (v) => {
  switch (v?.type) {
    case "integer":
      return BigInt(v.value);
    case "float":
      return Number(v.value);
    case "text":
      return String(v.value);
    case "blob":
      return Buffer.from(v.base64 ?? "", "base64");
    default:
      return null;
  }
};
const toValue = (v) => {
  if (v === null || v === undefined) return { type: "null" };
  if (typeof v === "bigint") return { type: "integer", value: String(v) };
  if (typeof v === "number") return Number.isInteger(v) ? { type: "integer", value: String(v) } : { type: "float", value: v };
  if (typeof v === "string") return { type: "text", value: v };
  if (v instanceof Uint8Array) return { type: "blob", base64: Buffer.from(v).toString("base64") };
  return { type: "text", value: String(v) };
};

/** SQL text registered with "store_sql" earlier in the same request (the client refers to it by id). */
let stored = new Map();

function run(stmt) {
  const text = stmt.sql ?? stored.get(stmt.sql_id);
  const s = db.prepare(text);
  s.setReadBigInts(true);
  const params = (stmt.args ?? []).map(toParam);
  const named = Object.fromEntries((stmt.named_args ?? []).map((n) => [n.name.replace(/^[:@$]/, ""), toParam(n.value)]));
  const cols = s.columns();
  if (cols.length > 0) {
    const rows = s.all(...(Object.keys(named).length ? [named] : params));
    return {
      cols: cols.map((c) => ({ name: c.name, decltype: c.type ?? null })),
      rows: rows.map((r) => cols.map((c) => toValue(r[c.name]))),
      affected_row_count: 0,
      last_insert_rowid: null,
    };
  }
  const r = s.run(...(Object.keys(named).length ? [named] : params));
  return { cols: [], rows: [], affected_row_count: Number(r.changes), last_insert_rowid: String(r.lastInsertRowid) };
}

const err = (e) => ({ message: String(e.message ?? e), code: e.code === "ERR_SQLITE_ERROR" ? "SQLITE_ERROR" : String(e.errstr ?? e.code ?? "SQLITE_ERROR") });

function condition(c, results, errors) {
  if (!c) return true;
  switch (c.type) {
    case "ok":
      return results[c.step] != null;
    case "error":
      return errors[c.step] != null;
    case "not":
      return !condition(c.cond, results, errors);
    case "and":
      return c.conds.every((x) => condition(x, results, errors));
    case "or":
      return c.conds.some((x) => condition(x, results, errors));
    case "is_autocommit":
      return !db.isTransaction;
    default:
      return false;
  }
}

function handle(req) {
  switch (req.type) {
    case "execute":
      return { type: "execute", result: run(req.stmt) };
    case "batch": {
      const results = [];
      const errors = [];
      req.batch.steps.forEach((step, i) => {
        results[i] = null;
        errors[i] = null;
        if (!condition(step.condition, results, errors)) return;
        try {
          results[i] = run(step.stmt);
        } catch (e) {
          errors[i] = err(e);
        }
      });
      return { type: "batch", result: { step_results: results, step_errors: errors } };
    }
    case "sequence":
      db.exec(req.sql);
      return { type: "sequence" };
    case "close":
      return { type: "close" };
    case "get_autocommit":
      return { type: "get_autocommit", is_autocommit: !db.isTransaction };
    case "store_sql":
      stored.set(req.sql_id, req.sql);
      return { type: "store_sql" };
    case "close_sql":
      stored.delete(req.sql_id);
      return { type: "close_sql" };
    default:
      throw new Error(`unsupported request ${req.type}`);
  }
}

http
  .createServer((rq, rs) => {
    if (rq.method === "GET") {
      rs.writeHead(rq.url === "/health" || rq.url === "/v2" ? 200 : 404).end();
      return;
    }
    if (rq.method === "POST" && rq.url === "/__reset") {
      // Test helper: wipe every table so each test file starts from an empty database.
      db.exec("PRAGMA foreign_keys = OFF");
      for (const r of db.prepare("SELECT name, type FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' AND type IN ('table','view')").all()) db.exec(`DROP ${r.type} IF EXISTS "${r.name}"`);
      db.exec("PRAGMA foreign_keys = ON");
      rs.writeHead(200).end("reset");
      return;
    }
    if (rq.method !== "POST" || !rq.url?.startsWith("/v2/pipeline")) {
      rs.writeHead(404).end();
      return;
    }
    const chunks = [];
    rq.on("data", (c) => chunks.push(c));
    rq.on("end", () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        stored = new Map();
        const results = body.requests.map((r) => {
          try {
            return { type: "ok", response: handle(r) };
          } catch (e) {
            return { type: "error", error: err(e) };
          }
        });
        rs.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify({ baton: null, base_url: null, results }));
      } catch (e) {
        rs.writeHead(400, { "content-type": "application/json" }).end(JSON.stringify({ error: String(e.message) }));
      }
    });
  })
  .listen(port, "127.0.0.1", () => console.log(`mock Turso listening on http://127.0.0.1:${port} (${file})`));
