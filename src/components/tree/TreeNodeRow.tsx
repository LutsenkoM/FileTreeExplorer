import { clsx } from "clsx";
import type { TreeNode } from "../../types/tree";

type TreeNodeRowProps = {
  node: TreeNode;
  depth?: number;
};

export const TreeNodeRow = ({ node, depth = 0 }: TreeNodeRowProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm",
        depth === 0 ? "bg-primary-soft text-primary" : "text-slate-700 hover:bg-slate-50",
      )}
      style={{ paddingLeft: `${12 + depth * 20}px` }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span
          className={clsx(
            "size-2 shrink-0 rounded-full",
            node.type === "folder" ? "bg-primary" : "bg-slate-400",
          )}
        />
        <span className="truncate font-medium">{node.name}</span>
      </div>

      <span className="shrink-0 text-xs text-muted">{node.type}</span>
    </div>
  );
};
