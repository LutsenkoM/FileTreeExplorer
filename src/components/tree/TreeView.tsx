import { useEffect, useMemo, useState } from "react";
import type { TreeNode } from "../../types/tree";
import { useTreeExplorer } from "../../context/treeContext/useTreeExplorer";
import { buildNodePath, findNodeByPath } from "../../utils/tree/path";
import { TreeNodeItem } from "./TreeNodeItem";

type TreeViewProps = {
  tree: TreeNode;
  expandAll?: boolean;
};

const collectFolderPaths = (node: TreeNode, nodePath: string, paths: Set<string>) => {
  if (node.type !== "folder") {
    return;
  }

  paths.add(nodePath);

  for (const child of node.children) {
    collectFolderPaths(child, buildNodePath(nodePath, child.name), paths);
  }
};

export const TreeView = ({ tree, expandAll = false }: TreeViewProps) => {
  const { selectPath, selectedPath, tree: originalTree } = useTreeExplorer();
  const rootPath = tree.name;
  const defaultExpandedPaths = useMemo(() => {
    const paths = new Set<string>();

    if (expandAll) {
      collectFolderPaths(tree, rootPath, paths);
      return paths;
    }

    if (tree.type === "folder") {
      paths.add(rootPath);
    }

    return paths;
  }, [expandAll, rootPath, tree]);
  const [expandedPaths, setExpandedPaths] = useState(defaultExpandedPaths);

  useEffect(() => {
    setExpandedPaths(defaultExpandedPaths);
  }, [defaultExpandedPaths]);

  const handleToggle = (nodePath: string) => {
    if (nodePath === rootPath) {
      return;
    }

    setExpandedPaths((currentPaths) => {
      const nextPaths = new Set(currentPaths);

      if (nextPaths.has(nodePath)) {
        nextPaths.delete(nodePath);
      } else {
        nextPaths.add(nodePath);
      }

      return nextPaths;
    });
  };

  return (
    <div className="w-full space-y-1 text-left">
      <TreeNodeItem
        depth={0}
        expandedPaths={expandedPaths}
        node={tree}
        nodePath={rootPath}
        getOriginalNode={(nodePath) =>
          originalTree ? findNodeByPath(originalTree, nodePath) : null
        }
        onSelect={selectPath}
        onToggle={handleToggle}
        selectedPath={selectedPath}
      />
    </div>
  );
};
