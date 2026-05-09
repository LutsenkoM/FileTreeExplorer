import type { TreeNode } from "../../types/tree";
import { TreeNodeRow } from "./TreeNodeRow";

type TreeNodeItemProps = {
  node: TreeNode;
  nodePath: string;
  depth: number;
  expandedPaths: Set<string>;
  onToggle: (nodePath: string) => void;
};

export const TreeNodeItem = ({
  node,
  nodePath,
  depth,
  expandedPaths,
  onToggle,
}: TreeNodeItemProps) => {
  const isFolder = node.type === "folder";
  const isExpanded = isFolder && expandedPaths.has(nodePath);

  return (
    <div>
      <TreeNodeRow
        depth={depth}
        isExpanded={isExpanded}
        node={node}
        onToggle={isFolder ? () => onToggle(nodePath) : undefined}
      />

      {isFolder && isExpanded ? (
        <div className="space-y-1">
          {node.children.map((child, index) => (
            <TreeNodeItem
              depth={depth + 1}
              expandedPaths={expandedPaths}
              key={`${nodePath}/${child.type}-${child.name}-${index}`}
              node={child}
              nodePath={`${nodePath}/${child.name}`}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
