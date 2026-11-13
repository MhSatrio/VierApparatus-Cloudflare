"use client";

import { useState } from "react";
import { apiMessage, useApi } from "../AdminProvider";

/**
 * The Pass / Fail dropdown in the tables. The server accepts "pass" only when the recorded check passes the current list, so a
 * pass cannot be picked here without the check behind it; the error from the server is shown and the dropdown goes back.
 */
export function RefCheckSelect({ entity, id, status, label }: { entity: "article" | "module"; id: string; status: "not_checked" | "pass" | "fail"; label: string }) {
  const api = useApi();
  const [value, setValue] = useState(status);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function change(next: "pass" | "fail") {
    const prev = value;
    setValue(next);
    setBusy(true);
    setError("");
    const r = await api.post<{ status: "pass" | "fail" }>("/api/admin/refcheck/status", { entity, id, status: next });
    setBusy(false);
    if (!r.ok) {
      setValue(prev);
      setError(apiMessage(r, "Could not change the reference check status."));
    }
  }

  const tone = value === "pass" ? "border-green-700 text-green-800" : value === "fail" ? "border-red-700 text-red-800" : "border-ink/30 text-ink/70";

  return (
    <div>
      <select
        aria-label={`Reference check status: ${label}`}
        value={value}
        disabled={busy}
        onChange={(e) => void change(e.target.value as "pass" | "fail")}
        className={`min-h-9 rounded-md border-2 bg-white px-2 text-sm font-semibold ${tone}`}
      >
        {value === "not_checked" && (
          <option value="not_checked" disabled>
            Not checked
          </option>
        )}
        <option value="pass">Pass</option>
        <option value="fail">Fail</option>
      </select>
      {error && (
        <p role="alert" className="mt-1 max-w-[12rem] text-xs font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
