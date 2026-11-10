"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { describedBy, Field } from "@/components/form/Field";

type State = { status: "idle" | "sending" | "done" | "error"; fields: Record<string, string>; message: string };
type Challenge = { token: string; question: string };

/**
 * The form for a reader's comment on a product. Whatever it checks, the server checks again: the human check is answered against a
 * signed, single-use question, the text is validated and cleaned there, and nothing is shown to anyone until the owner has approved it.
 */
export function CommentForm({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ status: "idle", fields: {}, message: "" });
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [rating, setRating] = useState(0);
  const startedAt = useRef(0);
  const e = state.fields;

  const load = useCallback(async () => {
    setChallenge(null);
    try {
      const r = await fetch("/api/products/captcha", { cache: "no-store" });
      const j = (await r.json()) as { ok?: boolean; token?: string; question?: string };
      if (j.ok && j.token && j.question) setChallenge({ token: j.token, question: j.question });
    } catch {
      /* the form says so below */
    }
  }, []);

  useEffect(() => {
    startedAt.current = Date.now();
    void load();
  }, [load]);

  async function submit(form: HTMLFormElement) {
    const data = new FormData(form);
    data.set("startedAt", String(startedAt.current));
    data.set("captchaToken", challenge?.token ?? "");
    data.set("rating", String(rating || ""));
    setState({ status: "sending", fields: {}, message: "" });
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(slug)}/comments`, { method: "POST", body: data });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; message?: string; fields?: Record<string, string> };
      if (res.ok && body.ok) return setState({ status: "done", fields: {}, message: "" });
      if (body.error === "validation" || body.error === "captcha") setState({ status: "error", fields: body.fields ?? {}, message: body.error === "captcha" ? (body.message ?? "") : "Please check the highlighted fields." });
      else if (res.status === 429) setState({ status: "error", fields: {}, message: body.message ?? "Too many submissions from your connection. Please try again later." });
      else if (res.status === 409) setState({ status: "error", fields: {}, message: body.message ?? "This comment has already been received." });
      else setState({ status: "error", fields: {}, message: "Sorry, that did not send. Please try again in a moment." });
    } catch {
      setState({ status: "error", fields: {}, message: "Network problem. Please check your connection and try again." });
    }
    void load(); // a question can be answered once
  }

  if (state.status === "done") {
    return (
      <div role="status" className="rounded-xl border border-brand/40 bg-sky/40 p-6">
        <h3 className="text-xl">Thank you. Your comment has been received.</h3>
        <p className="mt-2">Every comment is read by an editor before it is shown. It will appear on this page once approved.</p>
      </div>
    );
  }

  const input = (id: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input id={`c-${id}`} name={id} className="field" aria-invalid={e[id] ? true : undefined} aria-describedby={describedBy(`c-${id}`, e[id])} {...extra} />
  );

  return (
    <form
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        void submit(ev.currentTarget);
      }}
      className="space-y-5"
      aria-label="Add a comment"
    >
      <p className="text-sm text-ink/75">
        Share your experience with this product. Use the name you work under; add your institution or role if you can, because it helps other readers judge the comment. Please do not enter a home address. Comments are published only after
        review, and the information you give about yourself is shown as unverified unless an editor has checked it.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-displayName" label="Your name" required error={e.displayName}>
          {input("displayName", { autoComplete: "name", maxLength: 80 })}
        </Field>
        <Field id="c-role" label="Your professional role" error={e.role}>
          {input("role", { maxLength: 100, placeholder: "For example: laboratory technician" })}
        </Field>
        <Field id="c-affiliation" label="Institution or organization" error={e.affiliation}>
          {input("affiliation", { autoComplete: "organization", maxLength: 150 })}
        </Field>
        <Field id="c-orgAddress" label="Organization address" hint="Optional. A business or institutional address only, never a private home address." error={e.orgAddress}>
          {input("orgAddress", { maxLength: 200 })}
        </Field>
      </div>

      <fieldset>
        <legend className="mb-1.5 font-medium">
          Your rating <span className="font-normal text-ink/60">(optional)</span>
        </legend>
        <div className="flex flex-wrap items-center gap-1" role="radiogroup" aria-label="Rating from 1 to 5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} out of 5`}
              onClick={() => setRating(rating === n ? 0 : n)}
              className={`min-h-11 min-w-11 rounded-lg border text-xl ${rating >= n ? "border-brand bg-brand text-white" : "border-ink/25 text-ink/50 hover:border-brand"}`}
            >
              ★
            </button>
          ))}
          <span className="ml-2 text-sm text-ink/70">{rating ? `${rating} out of 5` : "Not rated"}</span>
        </div>
      </fieldset>

      <Field id="c-body" label="Your comment" required hint="What did you use it for, and how did it perform? At least 20 characters." error={e.body}>
        <textarea id="c-body" name="body" rows={6} maxLength={3000} className="field" aria-invalid={e.body ? true : undefined} aria-describedby={describedBy("c-body", e.body, "x")} />
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="c-website">Leave this field empty</label>
        <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="rounded-lg border border-ink/15 p-4">
        <p className="font-medium">Human check</p>
        {challenge ? (
          <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <Field id="c-captchaAnswer" label={challenge.question} required error={e.captchaAnswer}>
              <input id="c-captchaAnswer" name="captchaAnswer" inputMode="numeric" autoComplete="off" maxLength={4} className="field max-w-40" aria-invalid={e.captchaAnswer ? true : undefined} aria-describedby={describedBy("c-captchaAnswer", e.captchaAnswer)} />
            </Field>
            <button type="button" className="text-sm font-semibold text-brand underline underline-offset-4" onClick={() => void load()}>
              Different question
            </button>
          </div>
        ) : (
          <p className="mt-2 text-sm text-ink/70">
            Loading the question…{" "}
            <button type="button" className="font-semibold text-brand underline underline-offset-4" onClick={() => void load()}>
              Try again
            </button>
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-lg border-2 border-ink p-3 font-medium">
          {state.message}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={state.status === "sending" || !challenge}>
        {state.status === "sending" ? "Sending…" : "Submit comment for review"}
      </button>
    </form>
  );
}
