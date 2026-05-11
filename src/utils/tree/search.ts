import type { TreeNode } from "../../types/tree";
import { buildNodePath } from "./path";

export type TreeSearchResult = {
  node: TreeNode;
  path: string;
};

const searchNode = (
  node: TreeNode,
  nodePath: string,
  normalizedQuery: string,
  results: TreeSearchResult[],
) => {
  if (node.name.toLowerCase().includes(normalizedQuery)) {
    results.push({
      node,
      path: nodePath,
    });
  }

  if (node.type === "folder") {
    for (const child of node.children) {
      searchNode(child, buildNodePath(nodePath, child.name), normalizedQuery, results);
    }
  }
};

export const searchTreeByName = (tree: TreeNode, query: string): TreeSearchResult[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  const results: TreeSearchResult[] = [];
  searchNode(tree, tree.name, normalizedQuery, results);

  return results;
};
