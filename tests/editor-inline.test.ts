// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { domToInline, newBlock, youtubeId } from "@/components/admin/editor/inline";
import { inlineToHtml } from "@/lib/content/render";
import { blockSchema, type Inline } from "@/lib/content/schema";

const parse = (html: string) => {
  const el = document.createElement("div");
  el.innerHTML = html;
  return domToInline(el);
};

describe("editor DOM <-> canonical inline", () => {
  it("round-trips every supported mark through the same HTML the renderer produces", () => {
    const content: Inline[] = [
      { t: "text", text: "Plain " },
      { t: "text", text: "bold", b: true },
      { t: "text", text: " and " },
      { t: "text", text: "italic", i: true },
      { t: "text", text: " H" },
      { t: "text", text: "2", sub: true },
      { t: "text", text: "O x" },
      { t: "text", text: "2", sup: true },
      { t: "br" },
      { t: "text", text: "link", href: "https://example.com/a?b=1&c=2" },
      { t: "text", text: " ", },
      { t: "math", latex: "a^2 + b^2" },
      { t: "text", text: "code", code: true },
    ];
    expect(parse(inlineToHtml(content))).toEqual(content);
  });

  it("merges adjacent runs with identical marks and drops browser filler", () => {
    expect(parse("<b>a</b><b>b</b>&nbsp;c<br>")).toEqual([
      { t: "text", text: "ab", b: true },
      { t: "text", text: " c" },
    ]);
  });

  it("turns browser-created <div> lines into line breaks, not nested markup", () => {
    expect(parse("one<div>two</div><div>three</div>")).toEqual([
      { t: "text", text: "one" },
      { t: "br" },
      { t: "text", text: "two" },
      { t: "br" },
      { t: "text", text: "three" },
    ]);
  });

  it("understands inline styles some browsers write for formatting commands", () => {
    expect(parse('<span style="font-weight: bold;">x</span><span style="font-style: italic">y</span>')).toEqual([
      { t: "text", text: "x", b: true },
      { t: "text", text: "y", i: true },
    ]);
  });

  it("strips everything it does not understand, including scripts, handlers and unsafe links", () => {
    const out = parse('<script>alert(1)</script><img src=x onerror=alert(1)><a href="javascript:alert(1)">bad</a><a href="/ok">good</a><font color="red">c</font>');
    const html = inlineToHtml(out);
    expect(html).not.toMatch(/<script|<img|onerror|javascript:|<font/i);
    expect(out.find((n) => n.t === "text" && n.text === "good")).toMatchObject({ href: "/ok" });
    expect(out.find((n) => n.t === "text" && n.text === "bad")).not.toHaveProperty("href");
  });

  it("every new block validates against the canonical schema (except the image placeholder, which is filtered before saving)", () => {
    for (const type of ["heading", "paragraph", "list", "quote", "table", "code", "equation", "divider", "references", "callout", "embed"] as const) {
      expect(blockSchema.safeParse(newBlock(type)).success, type).toBe(true);
    }
  });

  it("extracts YouTube ids from the usual link shapes only", () => {
    expect(youtubeId("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youtubeId("https://youtu.be/dQw4w9WgXcQ?t=5")).toBe("dQw4w9WgXcQ");
    expect(youtubeId("https://www.youtube.com/embed/dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youtubeId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(youtubeId("https://evil.example/watch?v=dQw4w9WgXcQ")).toBeNull();
    expect(youtubeId("javascript:alert(1)")).toBeNull();
  });
});
