import type { TreeNode } from "../../types/tree";

// Builds a stable internal path for child node.
export const buildNodePath = (parentPath: string, nodeName: string) => {
  return parentPath ? `${parentPath}/${nodeName}` : nodeName;
};

// Encodes each path segment so node paths can be used safely in URLs.
export const encodeNodePath = (nodePath: string) => {
  return nodePath.split("/").map(encodeURIComponent).join("/");
};

// Finds a tree node by internal path.
export const findNodeByPath = (tree: TreeNode, nodePath: string): TreeNode | null => {
  if (nodePath === tree.name) {
    return tree;
  }

  if (tree.type !== "folder") {
    return null;
  }

  const pathSegments = nodePath.split("/");

  if (pathSegments[0] !== tree.name) {
    return null;
  }

  let currentNode: TreeNode = tree;

  for (const segment of pathSegments.slice(1)) {
    if (currentNode.type !== "folder") {
      return null;
    }

    const nextNode: TreeNode | undefined = currentNode.children.find(
      (child) => child.name === segment,
    );

    if (!nextNode) {
      return null;
    }

    currentNode = nextNode;
  }

  return currentNode;
};
