import { describe, expect, it } from "vitest";
import { validateTreeNode } from "./treeValidation";

describe("validateTreeNode", () => {
  it("accepts a valid file node", () => {
    const result = validateTreeNode({
      name: "index.ts",
      type: "file",
      size: 1024,
    });

    expect(result).toEqual({
      isValid: true,
      data: {
        name: "index.ts",
        type: "file",
        size: 1024,
      },
    });
  });

  it("accepts a valid file node with optional content", () => {
    const result = validateTreeNode({
      name: "README.md",
      type: "file",
      size: 120,
      content: "# Project",
    });

    expect(result).toEqual({
      isValid: true,
      data: {
        name: "README.md",
        type: "file",
        size: 120,
        content: "# Project",
      },
    });
  });

  it("accepts a valid folder node with nested children", () => {
    const result = validateTreeNode({
      name: "root",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
            {
              name: "main.tsx",
              type: "file",
              size: 512,
            },
          ],
        },
      ],
    });

    expect(result).toEqual({
      isValid: true,
      data: {
        name: "root",
        type: "folder",
        children: [
          {
            name: "src",
            type: "folder",
            children: [
              {
                name: "main.tsx",
                type: "file",
                size: 512,
              },
            ],
          },
        ],
      },
    });
  });

  it("rejects null", () => {
    const result = validateTreeNode(null);

    expect(result).toEqual({
      isValid: false,
      error: "root: node must be an object",
    });
  });

  it("rejects arrays as nodes", () => {
    const result = validateTreeNode([]);

    expect(result).toEqual({
      isValid: false,
      error: "root: node must be an object",
    });
  });

  it("rejects an empty node name", () => {
    const result = validateTreeNode({
      name: " ",
      type: "file",
      size: 100,
    });

    expect(result).toEqual({
      isValid: false,
      error: "root: name must be a non-empty string",
    });
  });

  it("rejects an unsupported node type", () => {
    const result = validateTreeNode({
      name: "index.ts",
      type: "unknown",
      size: 100,
    });

    expect(result).toEqual({
      isValid: false,
      error: 'root: type must be either "file" or "folder"',
    });
  });

  it("rejects a file without a valid size", () => {
    const result = validateTreeNode({
      name: "index.ts",
      type: "file",
    });

    expect(result).toEqual({
      isValid: false,
      error: "index.ts: size must be a non-negative finite number",
    });
  });

  it("rejects a file with a negative size", () => {
    const result = validateTreeNode({
      name: "index.ts",
      type: "file",
      size: -1,
    });

    expect(result).toEqual({
      isValid: false,
      error: "index.ts: size must be a non-negative finite number",
    });
  });

  it("rejects a file with a non-finite size", () => {
    const result = validateTreeNode({
      name: "index.ts",
      type: "file",
      size: Number.POSITIVE_INFINITY,
    });

    expect(result).toEqual({
      isValid: false,
      error: "index.ts: size must be a non-negative finite number",
    });
  });

  it("rejects a file with non-string content", () => {
    const result = validateTreeNode({
      name: "index.ts",
      type: "file",
      size: 100,
      content: 123,
    });

    expect(result).toEqual({
      isValid: false,
      error: "index.ts: content must be a string when provided",
    });
  });

  it("rejects a folder without children array", () => {
    const result = validateTreeNode({
      name: "root",
      type: "folder",
    });

    expect(result).toEqual({
      isValid: false,
      error: "root: children must be an array",
    });
  });

  it("rejects invalid nested children and includes the child path", () => {
    const result = validateTreeNode({
      name: "root",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
            {
              name: "index.ts",
              type: "file",
              size: -1,
            },
          ],
        },
      ],
    });

    expect(result).toEqual({
      isValid: false,
      error: "root/children[0]/src/children[0]/index.ts: size must be a non-negative finite number",
    });
  });
});
