import { describe, expect, it } from "vitest";
import { parseJson } from "./jsonValidation";

describe("parseJson", () => {
  it("accepts valid object JSON", () => {
    const result = parseJson('{"name":"root","type":"folder","children":[]}');

    expect(result).toEqual({
      isValid: true,
      data: {
        name: "root",
        type: "folder",
        children: [],
      },
    });
  });

  it("accepts valid array JSON", () => {
    const result = parseJson('[{"name":"index.ts","type":"file","size":100}]');

    expect(result).toEqual({
      isValid: true,
      data: [
        {
          name: "index.ts",
          type: "file",
          size: 100,
        },
      ],
    });
  });

  it("rejects an empty string", () => {
    const result = parseJson("");

    expect(result).toEqual({
      isValid: false,
      error: "JSON input cannot be empty",
    });
  });

  it("rejects a whitespace string", () => {
    const result = parseJson("   ");

    expect(result).toEqual({
      isValid: false,
      error: "JSON input cannot be empty",
    });
  });

  it("rejects invalid JSON", () => {
    const result = parseJson('{"name":');

    expect(result.isValid).toBe(false);

    if (!result.isValid) {
      expect(result.error).toContain("JSON");
    }
  });
});
