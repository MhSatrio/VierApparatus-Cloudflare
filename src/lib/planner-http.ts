import { HttpError } from "./auth/guard";
import type { User } from "./store/users";
import { PlannerError, type Viewer } from "./store/planner";

/** The signed-in user as the store layer sees them: id, name, role and permissions (never trusted from the request body). */
export const viewerOf = (u: User): Viewer => ({ id: u.id, name: u.name, role: u.role, permissions: u.permissions });

/** Store-layer errors become the matching HTTP status; anything else is rethrown (api.ts turns it into a safe 500). */
export function plannerToHttp(e: unknown): never {
  if (e instanceof PlannerError) {
    const status = e.code === "forbidden" ? 403 : e.code === "not_found" ? 404 : e.code === "conflict" ? 409 : 400;
    throw new HttpError(status, e.code, e.message);
  }
  throw e;
}
