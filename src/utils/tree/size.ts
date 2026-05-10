import type { TreeNode } from "../../types/tree";

export const getNodeSize = (node: TreeNode): number => {
  if (node.type === "file") {
    return node.size;
  }

  return node.children.reduce((totalSize, child) => totalSize + getNodeSize(child), 0);
};
