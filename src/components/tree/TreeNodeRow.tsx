import { clsx } from "clsx";
import type { TreeNode } from "../../types/tree";

type TreeNodeRowProps = {
  node: TreeNode;
  depth?: number;
  isExpanded?: boolean;
  onToggle?: () => void;
};

export const TreeNodeRow = ({
  node,
  depth = 0,
  isExpanded = false,
  onToggle,
}: TreeNodeRowProps) => {
  const isFolder = node.type === "folder";
  const Component = onToggle ? "button" : "div";

  return (
    <Component
      className={clsx(
        "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm",
        depth === 0 ? "bg-primary-soft text-primary" : "text-slate-700 hover:bg-slate-50",
        onToggle && "cursor-pointer",
      )}
      onClick={onToggle}
      style={{ paddingLeft: `${12 + depth * 20}px` }}
      type={onToggle ? "button" : undefined}
    >
      <div className="flex min-w-0 items-center gap-2">
        {isFolder ? (
          <span className="w-3 shrink-0 text-xs text-muted">{isExpanded ? "v" : ">"}</span>
        ) : (
          <span className="w-3 shrink-0" />
        )}
        <span
          className={clsx(
            "size-2 shrink-0 rounded-full",
            node.type === "folder" ? "bg-primary" : "bg-slate-400",
          )}
        />
        <span className="truncate font-medium">{node.name}</span>
      </div>

      <span className="shrink-0 text-xs text-muted">{node.type}</span>
    </Component>
  );
};
