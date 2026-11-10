/**
 * Builds an iCalendar (RFC 5545) feed of all-day events. Pure: no database, no clock except the one passed in, so it is easy to test.
 * Text is escaped as the standard requires (backslash, semicolon, comma, line break), and long lines are folded at 75 bytes.
 */

export type IcsEvent = { uid: string; date: string; summary: string; description: string };

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Escapes a text value for an iCalendar property. */
export function icsText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r\n|\r|\n/g, "\\n");
}

/** Folds one content line into lines of at most 75 bytes; continuation lines start with a space. */
export function foldLine(line: string): string {
  const enc = new TextEncoder();
  const out: string[] = [];
  let current = "";
  let bytes = 0;
  let limit = 75;
  for (const ch of line) {
    const size = enc.encode(ch).length;
    if (bytes + size > limit) {
      out.push(current);
      current = "";
      bytes = 0;
      limit = 74; // continuation lines carry a leading space, which counts toward the limit
    }
    current += ch;
    bytes += size;
  }
  out.push(current);
  return out.join("\r\n ");
}

/** The day after a YYYY-MM-DD date (all-day events end on the next day, exclusive). */
function nextDay(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

const compact = (date: string) => date.replace(/-/g, "");

const stamp = (now: Date) => now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Builds the calendar. Events whose date is not YYYY-MM-DD are skipped rather than producing an invalid file. */
export function buildIcs(opts: { calendarName: string; now: Date; events: IcsEvent[] }): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VierApparatus//Task deadlines//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${icsText(opts.calendarName)}`,
    "X-PUBLISHED-TTL:PT6H",
  ];
  const dtstamp = stamp(opts.now);
  for (const e of opts.events) {
    if (!DATE.test(e.date)) continue;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${icsText(e.uid)}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${compact(e.date)}`,
      `DTEND;VALUE=DATE:${compact(nextDay(e.date))}`,
      `SUMMARY:${icsText(e.summary)}`,
      `DESCRIPTION:${icsText(e.description)}`,
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
