import { describe, expect, it } from "vitest";
import type { TreeNode } from "../../types/tree";
import { getNodeSize } from "./size";

describe("getNodeSize", () => {
  it("returns file size for a file node", () => {
    const node: TreeNode = {
      name: "index.ts",
      type: "file",
      size: 1024,
    };

    expect(getNodeSize(node)).toBe(1024);
  });

  it("returns total file size for a folder subtree", () => {
    const node: TreeNode = {
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
              size: 1024,
            },
            {
              name: "Button.tsx",
              type: "file",
              size: 512,
            },
          ],
        },
        {
          name: "package.json",
          type: "file",
          size: 300,
        },
      ],
    };

    expect(getNodeSize(node)).toBe(1836);
  });

  it("returns zero for an empty folder", () => {
    const node: TreeNode = {
      name: "empty",
      type: "folder",
      children: [],
    };

    expect(getNodeSize(node)).toBe(0);
  });
});
