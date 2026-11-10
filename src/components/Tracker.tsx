"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * First-party, cookieless page-view and reading-time beacon (see lib/store/analytics.ts). It sends nothing when the
 * browser signals Do Not Track or Global Privacy Control, for crawlers, or on the admin area, and it never blocks
 * rendering: events are fire-and-forget `sendBeacon` calls. The only thing kept in the browser is a random id for the
 * current tab session (sessionStorage), which disappears when the tab is closed.
 */
/** Visits shorter than this send no engagement beacon: one request per page view instead of two for most bounces (saves function invocations). */
const MIN_ENGAGE_MS = 10_000;
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|facebookexternalhit|bingpreview/i;

type Nav = Navigator & { globalPrivacyControl?: boolean };

function optedOut(): boolean {
  const n = navigator as Nav;
  return n.doNotTrack === "1" || n.globalPrivacyControl === true || navigator.webdriver || BOT.test(navigator.userAgent);
}

function send(body: Record<string, unknown>) {
  try {
    const data = JSON.stringify(body);
    if (!navigator.sendBeacon?.("/api/collect", new Blob([data], { type: "application/json" }))) {
      void fetch("/api/collect", { method: "POST", headers: { "Content-Type": "application/json" }, body: data, keepalive: true });
    }
  } catch {
    /* analytics must never affect the page */
  }
}

function sessionId(): { id: string; fresh: boolean } {
  try {
    const existing = sessionStorage.getItem("va_s");
    if (existing) return { id: existing, fresh: false };
    const id = crypto.randomUUID().replace(/-/g, "").slice(0, 20);
    sessionStorage.setItem("va_s", id);
    return { id, fresh: true };
  } catch {
    return { id: crypto.randomUUID().replace(/-/g, "").slice(0, 20), fresh: true };
  }
}

function TrackerInner() {
  const pathname = usePathname();
  const started = useRef(0);
  const maxScroll = useRef(0);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || optedOut()) return;
    const { id, fresh } = sessionId();
    started.current = Date.now();
    maxScroll.current = 0;
    const q = new URLSearchParams(location.search);
    const utm = (k: string) => q.get(`utm_${k}`) ?? "";
    send({
      type: "pageview",
      path: pathname,
      sessionId: id,
      landing: fresh,
      referrer: fresh ? document.referrer : "",
      utm: fresh ? { source: utm("source"), medium: utm("medium"), campaign: utm("campaign"), content: utm("content"), term: utm("term") } : undefined,
    });

    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      if (scrollable > 0) maxScroll.current = Math.max(maxScroll.current, Math.round(((h.scrollTop + h.clientHeight) / h.scrollHeight) * 100));
      else maxScroll.current = 100;
    };
    const flush = () => {
      if (document.visibilityState !== "hidden" || !started.current) return;
      const ms = Date.now() - started.current;
      started.current = 0; // report each page view at most once
      if (ms >= MIN_ENGAGE_MS) send({ type: "engage", path: pathname, sessionId: id, durationMs: ms, scrollPct: maxScroll.current });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", flush);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", flush);
      if (started.current && Date.now() - started.current >= MIN_ENGAGE_MS) send({ type: "engage", path: pathname, sessionId: id, durationMs: Date.now() - started.current, scrollPct: maxScroll.current });
    };
  }, [pathname]);

  return null;
}

export function Tracker() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  );
}
