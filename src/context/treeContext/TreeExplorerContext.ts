import { createContext } from "react";
import { TreeNode } from "../../types/tree.ts";

type TreeExplorerContextValue = {
  tree: TreeNode | null;
  selectedPath: string | null;
  selectedNode: TreeNode | null;
  selectPath: (nodePath: string) => void;
  clearTree: () => void;
};

// Keeps Tree page state in one place.
export const TreeExplorerContext = createContext<TreeExplorerContextValue | null>(null);
