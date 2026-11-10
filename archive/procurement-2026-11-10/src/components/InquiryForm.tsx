"use client";

import { useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { INQUIRY_TYPES } from "@/lib/inquiry";
import { whatsappLink } from "@/lib/product-contact";
import { site } from "@/lib/site";
import Link from "next/link";

type Props = {
  variant?: "compact" | "full";
  defaultProduct?: string;
  defaultType?: (typeof INQUIRY_TYPES)[number];
};

type Status = "idle" | "submitting" | "success" | "error";

const newKey = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2));

export function InquiryForm({ variant = "compact", defaultProduct = "", defaultType }: Props) {
  const uid = useId();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(0);
  const key = useRef<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [mock, setMock] = useState(false);

  const id = (n: string) => `${uid}-${n}`;
  const full = variant === "full";

  function init() {
    if (!startedAt.current) startedAt.current = Date.now();
    if (!key.current) key.current = newKey();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return; // prevents accidental double submission
    init();
    const fd = new FormData(e.currentTarget);
    const body = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      inquiryType: String(fd.get("inquiryType") ?? ""),
      product: String(fd.get("product") ?? ""),
      quantity: String(fd.get("quantity") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      page: pathname,
      startedAt: startedAt.current,
      idempotencyKey: key.current,
    };
    setStatus("submitting");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string>; mock?: boolean };
      if (res.ok && data.ok) {
        setStatus("success");
        setMock(Boolean(data.mock));
        formRef.current?.reset();
        key.current = ""; // fresh key for any later inquiry
        startedAt.current = 0;
        return;
      }
      setStatus("error");
      if (data.error === "validation" && data.fields) {
        setErrors(data.fields);
        setMessage("Please check the highlighted fields.");
      } else if (res.status === 429) {
        setMessage("Too many requests from your connection. Please wait a few minutes and try again.");
      } else if (data.error === "not_configured") {
        setMessage("Our online form is temporarily unavailable. Please email or message us on WhatsApp instead.");
      } else {
        setMessage("We could not send your inquiry. Please try again, or contact us directly by email or WhatsApp.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl border border-brand/30 bg-sky p-6">
        <h3 className="text-xl">Thank you. Your inquiry has been sent.</h3>
        <p className="mt-2">
          We will review your requirement and reply to the email address you provided, typically within one to two
          business days.
        </p>
        {mock && <p className="mt-2 text-sm">Development mode: this was a mock submission and no email was sent.</p>}
        <button type="button" className="btn btn-secondary btn-sm mt-4" onClick={() => setStatus("idle")}>
          Send another inquiry
        </button>
      </div>
    );
  }

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, required = true) => (
    <div>
      <label htmlFor={id(name)} className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className="font-normal text-ink/70"> (optional)</span>}
      </label>
      <input
        id={id(name)}
        name={name}
        required={required}
        className="field"
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? id(`${name}-err`) : undefined}
        {...props}
      />
      {errors[name] && (
        <p id={id(`${name}-err`)} className="mt-1 text-sm font-medium text-ink">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={init} noValidate={false} aria-label="Inquiry form" className="space-y-4">
      <div className={`grid gap-4 ${full ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        {field("name", "Name", { autoComplete: "name", maxLength: 100 })}
        {field("company", "Company or organization", { autoComplete: "organization", maxLength: 150 })}
        {field("email", "Business email", { type: "email", autoComplete: "email", maxLength: 200 })}
        {full && field("phone", "Phone or WhatsApp", { type: "tel", autoComplete: "tel", maxLength: 40 }, false)}
        {field("country", "Country", { autoComplete: "country-name", maxLength: 80 })}
        <div>
          <label htmlFor={id("inquiryType")} className="mb-1.5 block text-sm font-medium">
            Inquiry type <span aria-hidden="true">*</span>
          </label>
          <select
            id={id("inquiryType")}
            name="inquiryType"
            required
            defaultValue={defaultType ?? INQUIRY_TYPES[0]}
            className="field"
            aria-invalid={errors.inquiryType ? true : undefined}
          >
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.inquiryType && <p className="mt-1 text-sm font-medium">{errors.inquiryType}</p>}
        </div>
        {full && field("product", "Product name or SKU", { defaultValue: defaultProduct, maxLength: 300 }, false)}
        {full && field("quantity", "Estimated quantity", { maxLength: 60 }, false)}
      </div>
      {!full && defaultProduct && <input type="hidden" name="product" value={defaultProduct} />}
      <div>
        <label htmlFor={id("message")} className="mb-1.5 block text-sm font-medium">
          {full ? "Message or technical requirements" : "Your requirement"} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={full ? 7 : 4}
          className="field"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? id("message-err") : undefined}
          placeholder="Equipment needed, required specifications, quantity, delivery country, timeline…"
        />
        {errors.message && (
          <p id={id("message-err")} className="mt-1 text-sm font-medium">
            {errors.message}
          </p>
        )}
      </div>
      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div aria-live="polite" className="min-h-0">
        {status === "error" && message && (
          <div role="alert" className="rounded-lg border-2 border-ink bg-white p-4 text-[0.95rem]">
            <p className="font-medium">{message}</p>
            <p className="mt-1">
              You can also email{" "}
              <a className="text-brand underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              or{" "}
              <a className="text-brand underline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                message us on WhatsApp
              </a>
              .
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send inquiry"}
        </button>
        <p className="text-sm text-ink/80">
          Sent over HTTPS and processed server-side. We use your details only to respond to this inquiry.{" "}
          <Link href="/privacy" className="text-brand underline">
            Privacy notice
          </Link>
        </p>
      </div>
    </form>
  );
}
