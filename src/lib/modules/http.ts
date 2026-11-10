import { HttpError } from "../auth/guard";
import { PlannerError } from "../store/planner";
import { ModuleError } from "../store/modules";

/** Store-layer errors become the matching HTTP status; anything else is rethrown (api.ts turns it into a safe 500). */
export function moduleToHttp(e: unknown): never {
  if (e instanceof ModuleError || e instanceof PlannerError) {
    const status = e.code === "forbidden" ? 403 : e.code === "not_found" ? 404 : e.code === "conflict" ? 409 : 400;
    throw new HttpError(status, e.code, e.message);
  }
  throw e;
}
