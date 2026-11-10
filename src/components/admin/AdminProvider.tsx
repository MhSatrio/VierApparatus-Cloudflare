"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

export type AdminUser = { id: string; name: string; email: string; role: "owner" | "contributor"; permissions: string[] };
type Ctx = { csrf: string; user: AdminUser };

const AdminContext = createContext<Ctx | null>(null);

export function AdminProvider({ csrf, user, children }: Ctx & { children: ReactNode }) {
  const value = useMemo(() => ({ csrf, user }), [csrf, user]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): Ctx {
  const c = useContext(AdminContext);
  if (!c) throw new Error("useAdmin must be used inside <AdminProvider>");
  return c;
}

export type ApiResult<T = Record<string, unknown>> = { ok: boolean; status: number; data: T & { ok?: boolean; error?: string; message?: string } };

/** fetch helper for the admin API: always sends the per-session CSRF token and the JSON content type. */
export function useApi() {
  const { csrf } = useAdmin();
  const send = useCallback(
    async <T = Record<string, unknown>>(method: string, url: string, body?: unknown): Promise<ApiResult<T>> => {
      try {
        const res = await fetch(url, {
          method,
          headers: { "X-CSRF-Token": csrf, ...(body !== undefined ? { "Content-Type": "application/json" } : {}) },
          body: body !== undefined ? JSON.stringify(body) : undefined,
          credentials: "same-origin",
        });
        const data = (await res.json().catch(() => ({}))) as ApiResult<T>["data"];
        return { ok: res.ok && data.ok !== false, status: res.status, data };
      } catch {
        return { ok: false, status: 0, data: { error: "network", message: "Network problem. Check your connection." } as ApiResult<T>["data"] };
      }
    },
    [csrf],
  );
  const upload = useCallback(
    async <T = Record<string, unknown>>(url: string, form: FormData): Promise<ApiResult<T>> => {
      try {
        const res = await fetch(url, { method: "POST", headers: { "X-CSRF-Token": csrf }, body: form, credentials: "same-origin" });
        const data = (await res.json().catch(() => ({}))) as ApiResult<T>["data"];
        return { ok: res.ok && data.ok !== false, status: res.status, data };
      } catch {
        return { ok: false, status: 0, data: { error: "network", message: "Network problem. Check your connection." } as ApiResult<T>["data"] };
      }
    },
    [csrf],
  );
  return useMemo(
    () => ({
      get: <T = Record<string, unknown>,>(url: string) => send<T>("GET", url),
      post: <T = Record<string, unknown>,>(url: string, body?: unknown) => send<T>("POST", url, body ?? {}),
      put: <T = Record<string, unknown>,>(url: string, body: unknown) => send<T>("PUT", url, body),
      patch: <T = Record<string, unknown>,>(url: string, body: unknown) => send<T>("PATCH", url, body),
      del: <T = Record<string, unknown>,>(url: string, body?: unknown) => send<T>("DELETE", url, body),
      upload,
    }),
    [send, upload],
  );
}

export const apiMessage = (r: ApiResult, fallback = "Something went wrong. Please try again.") => r.data.message || (r.status === 401 ? "Your session has ended. Sign in again." : r.status === 403 ? "You do not have permission to do that." : fallback);
