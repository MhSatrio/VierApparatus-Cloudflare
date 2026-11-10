import { z } from "zod";

/** Strip control characters (blocks CR/LF header injection) and collapse whitespace for single-line fields. */
export const oneLine = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\u0000-\u001F\u007F\u2028\u2029]/g, " ").replace(/\s+/g, " ").trim())
    .pipe(z.string().max(max, `Must be ${max} characters or fewer`));

export const multiLine = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim())
    .pipe(z.string().max(max, `Must be ${max} characters or fewer`));

const email = oneLine(200).pipe(z.string().toLowerCase().pipe(z.email("Please enter a valid email address")));

/** Optional list of http(s) links, one per line or comma separated. */
export const linkList = multiLine(1500).transform((v, ctx) => {
  const parts = v.split(/[\s,]+/).filter(Boolean);
  const out: string[] = [];
  for (const p of parts.slice(0, 10)) {
    try {
      const u = new URL(p);
      if (u.protocol === "https:" || u.protocol === "http:") out.push(u.toString());
      else throw new Error("protocol");
    } catch {
      ctx.addIssue({ code: "custom", message: `"${p.slice(0, 40)}" is not a valid web address (start with https://)` });
      return z.NEVER;
    }
  }
  return out.join("\n");
});

export const INQUIRY_TYPES = ["Partnership", "Product submission", "Quotation request", "Join as contributor", "Report a bug", "General inquiry", "Other"] as const;

/** A product path on this site (/products/<slug>), or nothing. Anything else is refused, so the link in the e-mail is always ours. */
const productPath = z
  .string()
  .trim()
  .max(200)
  .refine((v) => v === "" || /^\/products\/[a-z0-9][a-z0-9-]{0,160}$/.test(v), "Not a product address")
  .default("");
export type InquiryType = (typeof INQUIRY_TYPES)[number];

const antiBot = {
  website: z.string().max(200).optional().default(""), // honeypot: must stay empty
  startedAt: z.number().int().optional(), // client timestamp when the form was shown
};

/** One schema per inquiry type: the fields that matter change with the choice (conditional form). */
export const contactSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("Partnership"),
    name: oneLine(100).pipe(z.string().min(2, "Please enter your name")),
    email,
    organization: oneLine(150).optional().default(""),
    message: multiLine(4000).pipe(z.string().min(10, "Tell us a little about the partnership (at least 10 characters)")),
    ...antiBot,
  }),
  z.object({
    type: z.literal("Product submission"),
    name: oneLine(100).pipe(z.string().min(2, "Please enter your name")),
    email,
    organization: oneLine(150).pipe(z.string().min(2, "Please enter your company or organization")),
    role: oneLine(100).optional().default(""),
    productName: oneLine(200).pipe(z.string().min(2, "Name the product, or the range, you would like us to consider")),
    links: linkList.optional().default(""),
    message: multiLine(4000).pipe(z.string().min(20, "Tell us a little about the product (at least 20 characters)")),
    ...antiBot,
  }),
  z.object({
    type: z.literal("Quotation request"),
    name: oneLine(100).pipe(z.string().min(2, "Please enter your name")),
    email,
    organization: oneLine(150).optional().default(""),
    productName: oneLine(200).optional().default(""),
    productPath,
    message: multiLine(2000).optional().default(""),
    ...antiBot,
  }),
  z.object({
    type: z.literal("Join as contributor"),
    name: oneLine(100).pipe(z.string().min(2, "Please enter your name")),
    email,
    articleTitle: oneLine(200).pipe(z.string().min(5, "Add a working title or topic")),
    proposal: multiLine(4000).pipe(z.string().min(30, "Describe the article in a few sentences (at least 30 characters)")),
    links: linkList.optional().default(""),
    ...antiBot,
  }),
  z.object({
    type: z.literal("Report a bug"),
    name: oneLine(100).optional().default(""),
    email,
    pageUrl: oneLine(500).optional().default(""),
    message: multiLine(4000).pipe(z.string().min(10, "Describe what went wrong (at least 10 characters)")),
    ...antiBot,
  }),
  z.object({
    type: z.literal("General inquiry"),
    name: oneLine(100).pipe(z.string().min(2, "Please enter your name")),
    email,
    message: multiLine(4000).pipe(z.string().min(10, "Please write a short message (at least 10 characters)")),
    ...antiBot,
  }),
  z.object({
    type: z.literal("Other"),
    name: oneLine(100).pipe(z.string().min(2, "Please enter your name")),
    email,
    subject: oneLine(150).pipe(z.string().min(3, "Add a short subject")),
    message: multiLine(4000).pipe(z.string().min(10, "Please write a short message (at least 10 characters)")),
    ...antiBot,
  }),
]);
export type ContactInput = z.infer<typeof contactSchema>;

/** Public "Join as contributor" proposal (stored as a pending submission). */
export const submissionSchema = z.object({
  name: oneLine(100).pipe(z.string().min(2, "Please enter your name")),
  email,
  title: oneLine(200).pipe(z.string().min(5, "Add a working title")),
  topic: oneLine(120).pipe(z.string().min(2, "Add the topic or field")),
  proposal: multiLine(4000).pipe(z.string().min(50, "Describe the article in a few sentences (at least 50 characters)")),
  background: multiLine(2000).optional().default(""),
  links: linkList.optional().default(""),
  ...antiBot,
});
export type SubmissionInput = z.infer<typeof submissionSchema>;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const k = String(issue.path[0] ?? "form");
    if (!fields[k]) fields[k] = issue.message;
  }
  return fields;
}
