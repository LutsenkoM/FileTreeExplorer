import type { TreeNode } from "../../types/tree";
import { buildNodePath } from "../../utils/tree/path";
import { TreeNodeRow } from "./TreeNodeRow";

type TreeNodeItemProps = {
  node: TreeNode;
  nodePath: string;
  depth: number;
  expandedPaths: Set<string>;
  selectedPath: string | null;
  onSelect: (nodePath: string) => void;
  onToggle: (nodePath: string) => void;
};

export const TreeNodeItem = ({
  node,
  nodePath,
  depth,
  expandedPaths,
  selectedPath,
  onSelect,
  onToggle,
}: TreeNodeItemProps) => {
  const isFolder = node.type === "folder";
  const isRoot = depth === 0;
  const isExpanded = isFolder && (isRoot || expandedPaths.has(nodePath));
  const isSelected = selectedPath === nodePath;

  const handleSelect = () => {
    onSelect(nodePath);

    if (isFolder) {
      onToggle(nodePath);
    }
  };

  return (
    <div>
      <TreeNodeRow
        depth={depth}
        isExpanded={isExpanded}
        isSelected={isSelected}
        node={node}
        onSelect={handleSelect}
      />

      {isFolder && isExpanded ? (
        <div className="space-y-1">
          {node.children.map((child) => {
            const childPath = buildNodePath(nodePath, child.name);

            return (
              <TreeNodeItem
                depth={depth + 1}
                expandedPaths={expandedPaths}
                key={childPath}
                node={child}
                nodePath={childPath}
                onSelect={onSelect}
                onToggle={onToggle}
                selectedPath={selectedPath}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
