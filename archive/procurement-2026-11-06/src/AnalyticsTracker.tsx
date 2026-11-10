"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TrackerContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Crawlers that execute JavaScript (e.g. Googlebot) would otherwise trigger a serverless call per page.
    if (navigator.webdriver || /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|facebookexternalhit/i.test(navigator.userAgent)) return;

    let visitorId = localStorage.getItem("va_visitor_id");
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("va_visitor_id", visitorId);
    }

    let sessionId = sessionStorage.getItem("va_session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("va_session_id", sessionId);
    }

    // Capture browser language and timezone
    const language = navigator.language || "";
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

    const payload = {
      timestamp: new Date().toISOString(),
      visitorId,
      sessionId,
      page: pathname,
      pageTitle: document.title,
      browser: navigator.userAgent.includes("Chrome") ? "Chrome" : "Other",
      os: navigator.userAgent.includes("Win") ? "Windows" : "Other",
      device: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
      language,
      timezone,
    };

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerContent />
    </Suspense>
  );
}