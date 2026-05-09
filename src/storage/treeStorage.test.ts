import { beforeEach, describe, expect, it } from "vitest";
import type { TreeNode } from "../types/tree";
import { TREE_STORAGE_KEY, clearStoredTree, getStoredTree, saveStoredTree } from "./treeStorage";

const createLocalStorageMock = (): Storage => {
  let store: Record<string, string> = {};

  return {
    get length() {
      return Object.keys(store).length;
    },
    clear: () => {
      store = {};
    },
    getItem: (key: string) => {
      return store[key] ?? null;
    },
    key: (index: number) => {
      return Object.keys(store)[index] ?? null;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
  };
};

const validTree: TreeNode = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "index.ts",
      type: "file",
      size: 512,
      content: "export const value = 1;",
    },
  ],
};

describe("treeStorage", () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, "localStorage", {
      value: createLocalStorageMock(),
      configurable: true,
    });

    localStorage.clear();
  });

  it("returns null when no tree is stored", () => {
    expect(getStoredTree()).toBeNull();
  });

  it("saves and reads a valid tree", () => {
    saveStoredTree(validTree);

    expect(getStoredTree()).toEqual(validTree);
  });

  it("clears a stored tree", () => {
    saveStoredTree(validTree);
    clearStoredTree();

    expect(getStoredTree()).toBeNull();
  });

  it("returns null and removes invalid JSON from storage", () => {
    localStorage.setItem(TREE_STORAGE_KEY, "{");

    expect(getStoredTree()).toBeNull();
    expect(localStorage.getItem(TREE_STORAGE_KEY)).toBeNull();
  });

  it("returns null and removes structurally invalid tree data from storage", () => {
    localStorage.setItem(
      TREE_STORAGE_KEY,
      JSON.stringify({
        name: "root",
        type: "folder",
      }),
    );

    expect(getStoredTree()).toBeNull();
    expect(localStorage.getItem(TREE_STORAGE_KEY)).toBeNull();
  });
});
