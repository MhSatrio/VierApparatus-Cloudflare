import { describe, expect, it } from "vitest";
import { isArticleId } from "@/lib/article-id";

describe("Article IDs", () => {
  it("accepts the IDs the store generates", () => {
    expect(isArticleId("a_AbCdEf123456_x")).toBe(true);
    expect(isArticleId("  a_-VXXkveeeCulc78y  ")).toBe(true);
  });
  it("rejects anything that cannot be an article ID", () => {
    for (const bad of ["", "a_", "a_short", "p_AbCdEf123456", "A_AbCdEf123456", "a_has space", "T-0001", "a_AbCdEf123456; drop table"]) {
      expect(isArticleId(bad)).toBe(false);
    }
  });
});
