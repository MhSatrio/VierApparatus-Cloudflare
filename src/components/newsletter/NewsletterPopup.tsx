"use client";

import { useEffect, useState } from "react";

const DISMISSED = "vier.newsletter.dismissed"; // timestamp; the card stays away for 30 days after a close
const SUBSCRIBED = "vier.newsletter.subscribed"; // set after a successful sign-up
const DELAY_MS = 20000;
const QUIET_DAYS = 30;

/**
 * Newsletter card in the middle of the public site. It does not block the page: the rest of the page stays visible and
 * clickable around the card, it can be closed at any time (button or Escape), and it does not come back after a close
 * (for 30 days) or a sign-up. It scrolls inside itself on short screens, so it is never cut off. Consent is never
 * pre-ticked, and the sign-up uses the double opt-in flow (a confirmation e-mail). Shown only when the owner has switched
 * the popup on.
 */
export function NewsletterPopup({ title, message, topics }: { title: string; message: string; topics: string[] }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const close = () => {
    try {
      localStorage.setItem(DISMISSED, String(Date.now()));
    } catch {
      /* not remembered */
    }
    setOpen(false);
  };

  useEffect(() => {
    try {
      if (localStorage.getItem(SUBSCRIBED)) return;
      const d = Number(localStorage.getItem(DISMISSED) ?? 0);
      if (d && Date.now() - d < QUIET_DAYS * 86400000) return;
    } catch {
      /* storage blocked: show it, it will simply not remember the choice */
    }
    const t = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    // The wrapper covers the screen but lets clicks through, so the page behind the card stays usable.
    <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center p-4">
      <aside
        aria-labelledby="newsletter-title"
        className="pointer-events-auto relative max-h-[calc(100dvh-2rem)] w-[min(26rem,100%)] overflow-y-auto rounded-xl border border-ink/15 bg-white p-5 shadow-card"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="newsletter-title" className="text-lg leading-snug">
            {title}
          </h2>
          <button type="button" onClick={close} aria-label="Close" className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-xl leading-none hover:bg-sky/60">
            ×
          </button>
        </div>
        {state === "done" ? (
          <p role="status" className="mt-3 text-sm">
            {feedback}
          </p>
        ) : (
          <form
            className="mt-3 space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              setState("sending");
              try {
                const res = await fetch("/api/newsletter/subscribe", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email: f.get("email"),
                    name: f.get("name"),
                    interests: f.getAll("interest"),
                    consent: f.get("consent") === "on" ? true : false,
                    website: f.get("website"),
                  }),
                });
                const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
                if (res.ok && data.ok) {
                  try {
                    localStorage.setItem(SUBSCRIBED, "1");
                  } catch {
                    /* not remembered */
                  }
                  setFeedback(data.message ?? "Thank you.");
                  setState("done");
                } else {
                  setFeedback(data.message ?? "Something went wrong. Please try again.");
                  setState("error");
                }
              } catch {
                setFeedback("Network problem. Please try again.");
                setState("error");
              }
            }}
          >
            <p className="text-sm text-ink/80">{message}</p>
            <label className="block text-sm font-medium">
              E-mail
              <input name="email" type="email" required autoComplete="email" maxLength={254} className="field mt-1" />
            </label>
            <label className="block text-sm font-medium">
              Name (optional)
              <input name="name" autoComplete="name" maxLength={80} className="field mt-1" />
            </label>
            {topics.length > 0 && (
              <fieldset className="text-sm">
                <legend className="font-medium">Topics you are interested in (optional)</legend>
                <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                  {topics.slice(0, 12).map((t) => (
                    <label key={t} className="flex items-center gap-2">
                      <input type="checkbox" name="interest" value={t} />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            <label className="flex items-start gap-2 text-xs leading-relaxed">
              <input type="checkbox" name="consent" required className="mt-0.5" />
              <span>I agree to receive the VierApparatus newsletter by e-mail. I can unsubscribe at any time. I have read the privacy notice.</span>
            </label>
            {/* Hidden from people; bots tend to fill it in. */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {state === "error" && (
              <p role="alert" className="text-sm font-semibold">
                {feedback}
              </p>
            )}
            <button type="submit" disabled={state === "sending"} className="btn btn-primary btn-sm w-full">
              {state === "sending" ? "Sending…" : "Subscribe"}
            </button>
            <p className="text-xs text-ink/60">We send a confirmation e-mail first. Your address is kept only for the newsletter.</p>
          </form>
        )}
      </aside>
    </div>
  );
}
