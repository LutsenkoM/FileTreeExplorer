import type { TreeNode } from "../../types/tree";
import { buildNodePath } from "./path";

export type TreeSearchResult = {
  node: TreeNode;
  path: string;
};

export type TreeSearchMatch = {
  tree: TreeNode | null;
  results: TreeSearchResult[];
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

const filterNodeBySearch = (
  node: TreeNode,
  nodePath: string,
  normalizedQuery: string,
  results: TreeSearchResult[],
): TreeNode | null => {
  const isMatch = node.name.toLowerCase().includes(normalizedQuery);

  // File matches are leaves, so they can be returned directly.
  if (node.type === "file") {
    if (!isMatch) {
      return null;
    }

    results.push({
      node,
      path: nodePath,
    });

    return node;
  }

  const filteredChildren = node.children
    .map((child) =>
      filterNodeBySearch(child, buildNodePath(nodePath, child.name), normalizedQuery, results),
    )
    .filter((child): child is TreeNode => child !== null);

  if (isMatch) {
    results.push({
      node,
      path: nodePath,
    });
  }

  // Keep ancestor folders so the UI can show the full path to every match.
  if (!isMatch && filteredChildren.length === 0) {
    return null;
  }

  return {
    ...node,
    children: isMatch ? node.children : filteredChildren,
  };
};

export const filterTreeBySearch = (tree: TreeNode, query: string): TreeSearchMatch => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return {
      tree: null,
      results: [],
    };
  }

  const results: TreeSearchResult[] = [];
  const filteredTree = filterNodeBySearch(tree, tree.name, normalizedQuery, results);

  return {
    tree: filteredTree,
    results,
  };
};
