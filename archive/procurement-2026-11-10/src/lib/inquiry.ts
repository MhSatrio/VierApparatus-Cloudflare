import { z } from "zod";

export const INQUIRY_TYPES = [
  "Request a quotation",
  "Product sourcing",
  "Technical specifications",
  "General procurement",
  "Partnership",
] as const;

/** Strip control characters (blocks CR/LF header injection) and collapse whitespace for single-line fields. */
const oneLine = (max: number) =>
  z
    .string()
    .transform((s) => s.replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim())
    .pipe(z.string().max(max, `Must be ${max} characters or fewer`));

const multiLine = (max: number) =>
  z
    .string()
    .transform((s) => s.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim())
    .pipe(z.string().max(max, `Must be ${max} characters or fewer`));

export const inquirySchema = z.object({
  name: oneLine(100).pipe(z.string().min(2, "Please enter your name")),
  company: oneLine(150).pipe(z.string().min(2, "Please enter your company or organization")),
  email: oneLine(200).pipe(z.string().toLowerCase().pipe(z.email("Please enter a valid email address"))),
  phone: oneLine(40)
    .pipe(z.string().regex(/^[0-9+()\-.\s]*$/, "Phone may only contain digits, spaces and + ( ) - ."))
    .optional()
    .default(""),
  country: oneLine(80).pipe(z.string().min(2, "Please enter your country")),
  inquiryType: z.enum(INQUIRY_TYPES, { error: "Please choose an inquiry type" }),
  product: oneLine(300).optional().default(""),
  quantity: oneLine(60).optional().default(""),
  message: multiLine(4000).pipe(z.string().min(10, "Please describe your requirement (at least 10 characters)")),
  page: oneLine(300).optional().default(""),
  // Anti-bot fields
  website: z.string().max(200).optional().default(""), // honeypot: must stay empty
  startedAt: z.number().int().optional(), // client timestamp when the form was rendered
  idempotencyKey: z.string().min(8).max(64).regex(/^[A-Za-z0-9_-]+$/).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const MAX_BODY_BYTES = 16 * 1024;

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildSubject(i: Pick<InquiryInput, "inquiryType" | "product" | "company">): string {
  const base = `[VierApparatus] ${i.inquiryType}`;
  const subj = i.product ? `${base}: ${i.product}` : `${base} from ${i.company}`;
  return subj.replace(/[\r\n]+/g, " ").slice(0, 200);
}

export function buildEmailHtml(i: InquiryInput): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#231F20">${escapeHtml(value)}</td></tr>`
      : "";
  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#231F20">
<h2 style="color:#4570B6;margin:0 0 12px">New website inquiry</h2>
<table style="border-collapse:collapse">
${row("Type", i.inquiryType)}${row("Name", i.name)}${row("Organization", i.company)}${row("Email", i.email)}${row("Phone / WhatsApp", i.phone)}${row("Country", i.country)}${row("Product / SKU", i.product)}${row("Quantity", i.quantity)}${row("Submitted from", i.page)}
</table>
<h3 style="margin:18px 0 6px">Message</h3>
<div style="white-space:pre-wrap;border-left:3px solid #CAEBFB;padding-left:12px">${escapeHtml(i.message)}</div>
</body></html>`;
}

export function buildEmailText(i: InquiryInput): string {
  const lines: string[] = [`Type: ${i.inquiryType}`, `Name: ${i.name}`, `Organization: ${i.company}`, `Email: ${i.email}`];
  if (i.phone) lines.push(`Phone / WhatsApp: ${i.phone}`);
  lines.push(`Country: ${i.country}`);
  if (i.product) lines.push(`Product / SKU: ${i.product}`);
  if (i.quantity) lines.push(`Quantity: ${i.quantity}`);
  if (i.page) lines.push(`Submitted from: ${i.page}`);
  lines.push("", "Message:", i.message);
  return lines.join("\n");
}
