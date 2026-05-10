import { useMemo, useState } from "react";
import type { TreeNode } from "../../types/tree";
import { useTreeExplorer } from "../../context/treeContext/useTreeExplorer";
import { TreeNodeItem } from "./TreeNodeItem";

type TreeViewProps = {
  tree: TreeNode;
};

export const TreeView = ({ tree }: TreeViewProps) => {
  const { selectPath, selectedPath } = useTreeExplorer();
  const rootPath = tree.name;
  const initialExpandedPaths = useMemo(() => {
    return tree.type === "folder" ? new Set([rootPath]) : new Set<string>();
  }, [rootPath, tree.type]);
  const [expandedPaths, setExpandedPaths] = useState(initialExpandedPaths);

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
        onSelect={selectPath}
        onToggle={handleToggle}
        selectedPath={selectedPath}
      />
    </div>
  );
};
