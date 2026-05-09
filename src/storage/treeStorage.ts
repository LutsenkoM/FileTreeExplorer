import type { TreeNode } from "../types/tree";
import { validateTreeNode } from "../utils/validation/treeValidation";

export const TREE_STORAGE_KEY = "file-tree-explorer:active-tree";

export const getStoredTree = (): TreeNode | null => {
  const storedValue = localStorage.getItem(TREE_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as unknown;
    const validationResult = validateTreeNode(parsedValue);

    if (!validationResult.isValid) {
      localStorage.removeItem(TREE_STORAGE_KEY);
      return null;
    }

    return validationResult.data;
  } catch {
    localStorage.removeItem(TREE_STORAGE_KEY);
    return null;
  }
};

export const saveStoredTree = (tree: TreeNode) => {
  localStorage.setItem(TREE_STORAGE_KEY, JSON.stringify(tree));
};

export const clearStoredTree = () => {
  localStorage.removeItem(TREE_STORAGE_KEY);
};
