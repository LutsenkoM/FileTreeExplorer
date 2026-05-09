import type { TreeNode } from "../../types/tree";
import { TreeNodeRow } from "./TreeNodeRow";

type TreePreviewProps = {
  tree: TreeNode;
};

export const TreePreview = ({ tree }: TreePreviewProps) => {
  const children = tree.type === "folder" ? tree.children : [];

  return (
    <div className="w-full space-y-1 text-left">
      <TreeNodeRow node={tree} />

      {children.length > 0 ? (
        <div className="space-y-1">
          {children.map((child, index) => (
            <TreeNodeRow depth={1} key={`${child.type}-${child.name}-${index}`} node={child} />
          ))}
        </div>
      ) : (
        <p className="px-3 py-4 text-center text-sm text-muted">
          {tree.type === "folder" ? "This folder has no children." : "Root node is a file."}
        </p>
      )}
    </div>
  );
};
