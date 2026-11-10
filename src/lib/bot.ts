/**
 * Tells people's browsers from crawlers and scripted clients, from the User-Agent header alone. It is a best effort list:
 * a bot that presents a normal browser identity is still counted as human. An empty User-Agent is treated as a bot, because a
 * real browser always sends one.
 */
export const BOT_PATTERN =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|ahrefs|semrush|mj12|dotbot|petalbot|bytespider|gptbot|claude|anthropic|openai|perplexity|ccbot|facebookexternalhit|bingpreview|python-requests|curl\/|wget|node-fetch|axios|go-http-client|okhttp|java\//i;

export type VisitorKind = "human" | "bot";

export function visitorKind(userAgent: string): VisitorKind {
  if (!userAgent.trim()) return "bot";
  return BOT_PATTERN.test(userAgent) ? "bot" : "human";
}
