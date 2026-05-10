import { useMemo, useState, type ReactNode } from "react";
import { clearStoredTree, getStoredTree } from "../../storage/treeStorage";
import { findNodeByPath } from "../../utils/tree/path";
import { TreeExplorerContext } from "./TreeExplorerContext";

type TreeExplorerProviderProps = {
  children: ReactNode;
};

export const TreeExplorerProvider = ({ children }: TreeExplorerProviderProps) => {
  const [tree, setTree] = useState(() => getStoredTree());
  const [selectedPath, setSelectedPath] = useState(() => tree?.name ?? null);

  const selectedNode = useMemo(() => {
    return tree && selectedPath ? findNodeByPath(tree, selectedPath) : null;
  }, [selectedPath, tree]);

  const selectPath = (nodePath: string) => {
    if (!tree || !findNodeByPath(tree, nodePath)) {
      return;
    }

    setSelectedPath(nodePath);
  };

  const clearTree = () => {
    clearStoredTree();
    setTree(null);
    setSelectedPath(null);
  };

  return (
    <TreeExplorerContext.Provider
      value={{
        tree,
        selectedPath,
        selectedNode,
        selectPath,
        clearTree,
      }}
    >
      {children}
    </TreeExplorerContext.Provider>
  );
};
