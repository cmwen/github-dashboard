import { describe, expect, it } from "vitest";

import { createAuthorizationHeader, isOpenObserveEnabled } from "./logger.ts";

describe("OpenObserve logger helpers", () => {
  it("formats the basic authorization header", () => {
    expect(createAuthorizationHeader("abc123")).toBe("Basic abc123");
  });

  it("requires both endpoint and access key", () => {
    expect(
      isOpenObserveEnabled({
        endpoint: "http://localhost:5080/api/default/nodejs/_json",
        accessKey: "key",
      }),
    ).toBe(true);
    expect(isOpenObserveEnabled({ endpoint: "", accessKey: "key" })).toBe(false);
    expect(isOpenObserveEnabled({ endpoint: "http://localhost:5080", accessKey: "" })).toBe(false);
  });
});
