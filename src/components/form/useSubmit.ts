"use client";

import { useEffect, useRef, useState } from "react";

export type SubmitState = { status: "idle" | "sending" | "done" | "error"; fields: Record<string, string>; message: string };

/** Posts a FormData to a public form endpoint and maps the response to field errors / a status message. */
export function useSubmit(endpoint: string) {
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now(); // when the form was shown: a submission seconds later is a script
  }, []);
  const [state, setState] = useState<SubmitState>({ status: "idle", fields: {}, message: "" });

  async function submit(form: HTMLFormElement) {
    const data = new FormData(form);
    data.set("startedAt", String(startedAt.current));
    setState({ status: "sending", fields: {}, message: "" });
    try {
      const res = await fetch(endpoint, { method: "POST", body: data });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string> };
      if (res.ok && body.ok) {
        setState({ status: "done", fields: {}, message: "" });
        return true;
      }
      if (body.error === "validation") setState({ status: "error", fields: body.fields ?? {}, message: "Please check the highlighted fields." });
      else if (res.status === 429) setState({ status: "error", fields: {}, message: "Too many submissions from your connection. Please try again later." });
      else if (res.status === 413) setState({ status: "error", fields: {}, message: "The attached file is too large." });
      else setState({ status: "error", fields: {}, message: "Sorry, that did not send. Please try again, or write to us directly by e-mail." });
    } catch {
      setState({ status: "error", fields: {}, message: "Network problem. Please check your connection and try again." });
    }
    return false;
  }

  return { state, submit, reset: () => setState({ status: "idle", fields: {}, message: "" }) };
}
