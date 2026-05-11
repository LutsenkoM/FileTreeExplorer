import { describe, expect, it } from "vitest";
import type { TreeNode } from "../../types/tree";
import { filterTreeBySearch, searchTreeByName } from "./search";

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
      name: "README.md",
      type: "file",
      size: 300,
    },
  ],
};

describe("searchTreeByName", () => {
  it("returns matching nodes with full paths", () => {
    expect(searchTreeByName(tree, "button")).toEqual([
      {
        node: {
          name: "Button.tsx",
          type: "file",
          size: 512,
        },
        path: "root/src/components/Button.tsx",
      },
    ]);
  });

  it("searches case-insensitively", () => {
    expect(searchTreeByName(tree, "readme")).toEqual([
      {
        node: {
          name: "README.md",
          type: "file",
          size: 300,
        },
        path: "root/README.md",
      },
    ]);
  });

  it("can match folders", () => {
    expect(searchTreeByName(tree, "components")).toEqual([
      {
        node: {
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
        path: "root/src/components",
      },
    ]);
  });

  it("returns an empty array for empty query", () => {
    expect(searchTreeByName(tree, " ")).toEqual([]);
  });
});

describe("filterTreeBySearch", () => {
  it("keeps the hierarchy path to matching nodes", () => {
    expect(filterTreeBySearch(tree, "button").tree).toEqual({
      name: "root",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
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
      ],
    });
  });

  it("includes a matching folder subtree", () => {
    expect(filterTreeBySearch(tree, "components").tree).toEqual({
      name: "root",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
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
      ],
    });
  });

  it("returns null tree when there are no matches", () => {
    expect(filterTreeBySearch(tree, "missing").tree).toBeNull();
  });
});
