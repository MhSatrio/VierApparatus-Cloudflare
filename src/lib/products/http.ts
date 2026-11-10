import { z } from "zod";
import { fail, json } from "../api";
import { ProductError } from "../store/products";
import { viewerOf } from "../planner-http";
import type { Authed } from "../auth/guard";

/** Product-store errors become the matching HTTP response, with the list of problems when publishing was refused. Anything else goes to the common handler. */
export function productFail(e: unknown) {
  if (e instanceof ProductError) {
    const status = e.code === "forbidden" ? 403 : e.code === "not_found" ? 404 : e.code === "conflict" ? 409 : e.problems.length ? 422 : 400;
    return json({ ok: false, error: e.code, message: e.message, ...(e.problems.length ? { problems: e.problems } : {}) }, status);
  }
  if (e instanceof z.ZodError) {
    const issue = e.issues[0];
    return json({ ok: false, error: "validation", message: `${issue.path.join(".") || "value"}: ${issue.message}` }, 400);
  }
  return fail(e);
}

export const viewer = (s: Authed) => viewerOf(s.user);
