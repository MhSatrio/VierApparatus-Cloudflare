"use client";

import { useState } from "react";
import { describedBy, Field } from "./form/Field";
import { useSubmit } from "./form/useSubmit";
import { INQUIRY_TYPES, type InquiryType } from "@/lib/forms";
import { site } from "@/lib/site";

/** The fields change with the chosen reason for writing; the server validates the same rules (lib/forms.ts). */
/**
 * `initialProduct` is set when a visitor arrives from a product page ("Learn more"): the product's name and its address on this site
 * are filled in, and the visitor may change the name. The address is sent as a hidden field and checked on the server.
 */
export function ContactForm({ initialType, initialProduct }: { initialType?: InquiryType; initialProduct?: { name: string; path: string } }) {
  const [type, setType] = useState<InquiryType>(initialType ?? "General inquiry");
  const { state, submit } = useSubmit("/api/contact");
  const e = state.fields;
  const sending = state.status === "sending";

  if (state.status === "done") {
    return (
      <div role="status" className="rounded-xl border border-brand/40 bg-sky/40 p-6">
        <h2 className="text-2xl">Thank you. Your message has been sent.</h2>
        <p className="mt-2">
          {type === "Join as contributor"
            ? "Your proposal is now waiting for editorial review. Submitting does not guarantee publication, and it does not create an account."
            : type === "Quotation request"
              ? "A member of our team will contact you by e-mail."
              : "We read every message and reply by e-mail when one is needed."}
        </p>
      </div>
    );
  }

  const input = (id: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input id={id} name={id} className="field" aria-invalid={e[id] ? true : undefined} aria-describedby={describedBy(id, e[id])} {...extra} />
  );

  return (
    <form
      noValidate
      encType="multipart/form-data"
      onSubmit={(ev) => {
        ev.preventDefault();
        void submit(ev.currentTarget);
      }}
      className="space-y-5"
    >
      <div>
        <label htmlFor="type" className="mb-1.5 block font-medium">
          What would you like to talk about? <span aria-hidden="true">*</span>
        </label>
        <select id="type" name="type" value={type} onChange={(ev) => setType(ev.target.value as InquiryType)} className="field">
          {INQUIRY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required={type !== "Report a bug"} error={e.name}>
          {input("name", { autoComplete: "name", maxLength: 100 })}
        </Field>
        <Field id="email" label="E-mail" required error={e.email}>
          {input("email", { type: "email", autoComplete: "email", maxLength: 200 })}
        </Field>
      </div>

      {type === "Partnership" && (
        <>
          <Field id="organization" label="Organization" error={e.organization}>
            {input("organization", { maxLength: 150 })}
          </Field>
          <Field id="message" label="What do you have in mind?" required error={e.message}>
            <textarea id="message" name="message" rows={6} maxLength={4000} className="field" aria-invalid={e.message ? true : undefined} aria-describedby={describedBy("message", e.message)} />
          </Field>
        </>
      )}

      {type === "Quotation request" && (
        <>
          <Field id="organization" label="Institution" hint="Optional." error={e.organization}>
            {input("organization", { maxLength: 150, autoComplete: "organization" })}
          </Field>
          <Field id="productName" label="Product" hint="The product you would like to know more about. Type it here if you came from somewhere else." error={e.productName}>
            {input("productName", { maxLength: 200, defaultValue: initialProduct?.name ?? "" })}
          </Field>
          <input type="hidden" name="productPath" value={initialProduct?.path ?? ""} />
          <Field id="message" label="What would you like to know?" hint="Optional. A line or two is enough; we can also reach you by e-mail." error={e.message}>
            <textarea id="message" name="message" rows={4} maxLength={2000} className="field" aria-invalid={e.message ? true : undefined} aria-describedby={describedBy("message", e.message, "x")} />
          </Field>
        </>
      )}

      {type === "Product submission" && (
        <>
          <p className="rounded-lg border border-ink/15 bg-sky/20 p-3 text-sm">
            For manufacturers, suppliers, distributors and their representatives. Submitting does not guarantee inclusion, and it is not an advertisement: our editors review the technical documentation and decide whether the product suits the platform. Any commercial
            relationship would be disclosed.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="organization" label="Company or organization" required error={e.organization}>
              {input("organization", { maxLength: 150, autoComplete: "organization" })}
            </Field>
            <Field id="role" label="Your role" error={e.role}>
              {input("role", { maxLength: 100, placeholder: "For example: product manager" })}
            </Field>
          </div>
          <Field id="productName" label="Product or product range" required error={e.productName}>
            {input("productName", { maxLength: 200 })}
          </Field>
          <Field id="links" label="Documentation links" hint="Product page, datasheet or manual. One per line." error={e.links}>
            <textarea id="links" name="links" rows={3} maxLength={1500} className="field" aria-invalid={e.links ? true : undefined} aria-describedby={describedBy("links", e.links, "x")} />
          </Field>
          <Field id="message" label="About the product" required hint="What it is, what it is used for, and where the technical documentation can be found." error={e.message}>
            <textarea id="message" name="message" rows={6} maxLength={4000} className="field" aria-invalid={e.message ? true : undefined} aria-describedby={describedBy("message", e.message, "x")} />
          </Field>
        </>
      )}

      {type === "Join as contributor" && (
        <>
          <Field id="articleTitle" label="Article title or topic" required error={e.articleTitle}>
            {input("articleTitle", { maxLength: 200 })}
          </Field>
          <Field id="proposal" label="Short article proposal" required hint="What will the article explain, and what evidence will it rest on?" error={e.proposal}>
            <textarea id="proposal" name="proposal" rows={6} maxLength={4000} className="field" aria-invalid={e.proposal ? true : undefined} aria-describedby={describedBy("proposal", e.proposal, "x")} />
          </Field>
          <Field id="links" label="Relevant links" hint="Papers, your profile or earlier writing. One per line." error={e.links}>
            <textarea id="links" name="links" rows={3} maxLength={1500} className="field" aria-invalid={e.links ? true : undefined} aria-describedby={describedBy("links", e.links, "x")} />
          </Field>
          <Field id="file" label="Article draft" hint="Markdown (.md) or text (.txt), up to 300 KB." error={e.file}>
            <input id="file" name="file" type="file" accept=".md,.markdown,.txt,text/markdown,text/plain" className="field py-2" />
          </Field>
          <p className="text-sm text-ink/70">All submissions are subject to editorial review. A proposal does not guarantee publication and does not create an account.</p>
        </>
      )}

      {type === "Report a bug" && (
        <>
          <Field id="pageUrl" label="Page address" hint="Where did it happen? Paste the address from your browser." error={e.pageUrl}>
            {input("pageUrl", { type: "text", maxLength: 500, placeholder: `${site.url}/articles/...` })}
          </Field>
          <Field id="message" label="What went wrong?" required error={e.message}>
            <textarea id="message" name="message" rows={6} maxLength={4000} className="field" aria-invalid={e.message ? true : undefined} aria-describedby={describedBy("message", e.message)} />
          </Field>
          <Field id="file" label="Screenshot" hint="PNG, JPEG, WebP or GIF, up to 1 MB." error={e.file}>
            <input id="file" name="file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="field py-2" />
          </Field>
        </>
      )}

      {type === "Other" && (
        <>
          <Field id="subject" label="Subject" required error={e.subject}>
            {input("subject", { maxLength: 150 })}
          </Field>
          <Field id="message" label="Message" required error={e.message}>
            <textarea id="message" name="message" rows={6} maxLength={4000} className="field" aria-invalid={e.message ? true : undefined} aria-describedby={describedBy("message", e.message)} />
          </Field>
        </>
      )}

      {type === "General inquiry" && (
        <Field id="message" label="Message" required error={e.message}>
          <textarea id="message" name="message" rows={6} maxLength={4000} className="field" aria-invalid={e.message ? true : undefined} aria-describedby={describedBy("message", e.message)} />
        </Field>
      )}

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-lg border-2 border-ink p-3 font-medium">
          {state.message}
        </p>
      )}
      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>
      <p className="text-sm text-ink/70">
        Prefer e-mail? Write to{" "}
        <a className="text-brand underline underline-offset-4" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        . See the{" "}
        <a className="text-brand underline underline-offset-4" href="/privacy">
          privacy notice
        </a>{" "}
        for how messages are handled.
      </p>
    </form>
  );
}
