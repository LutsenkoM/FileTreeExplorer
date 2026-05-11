import { describe, expect, it } from "vitest";
import type { TreeNode } from "../../types/tree";
import { buildNodePath, encodeNodePath, findNodeByPath } from "./path";

const tree: TreeNode = {
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
          name: "components",
          type: "folder",
          children: [
            {
              name: "Button.tsx",
              type: "file",
              size: 512,
            },
          ],
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

describe("buildNodePath", () => {
  it("returns the node name when parent path is empty", () => {
    expect(buildNodePath("", "root")).toBe("root");
  });

  it("appends a node name to the parent path", () => {
    expect(buildNodePath("root/src", "index.ts")).toBe("root/src/index.ts");
  });
});

describe("encodeNodePath", () => {
  it("encodes every path segment without encoding path separators", () => {
    expect(encodeNodePath("root/src/my file.ts")).toBe("root/src/my%20file.ts");
  });
});

describe("findNodeByPath", () => {
  it("returns the root node by root path", () => {
    expect(findNodeByPath(tree, "root")).toBe(tree);
  });

  it("returns a nested folder by path", () => {
    expect(findNodeByPath(tree, "root/src/components")).toEqual({
      name: "components",
      type: "folder",
      children: [
        {
          name: "Button.tsx",
          type: "file",
          size: 512,
        },
      ],
    });
  });

  it("returns a nested file by path", () => {
    expect(findNodeByPath(tree, "root/src/index.ts")).toEqual({
      name: "index.ts",
      type: "file",
      size: 1024,
    });
  });

  it("returns null when the path does not start from root", () => {
    expect(findNodeByPath(tree, "src/index.ts")).toBeNull();
  });

  it("returns null when a path segment does not exist", () => {
    expect(findNodeByPath(tree, "root/src/missing.ts")).toBeNull();
  });

  it("returns null when the path tries to go through a file", () => {
    expect(findNodeByPath(tree, "root/package.json/name")).toBeNull();
  });
});
