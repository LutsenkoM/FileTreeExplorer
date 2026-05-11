import type { ReactNode } from "react";
import type { TreeNode } from "../../types/tree";
import { FileDetails } from "./FileDetails";
import { FolderDetails } from "./FolderDetails";

type NodeDetailsContentProps = {
  node: TreeNode;
  nodePath: string;
  headerAction?: ReactNode;
  onSelectPath?: (nodePath: string) => void;
};

export const NodeDetailsContent = ({
  node,
  nodePath,
  headerAction,
  onSelectPath,
}: NodeDetailsContentProps) => {
  if (node.type === "file") {
    return <FileDetails headerAction={headerAction} node={node} nodePath={nodePath} />;
  }

  return (
    <FolderDetails
      headerAction={headerAction}
      node={node}
      nodePath={nodePath}
      onSelectPath={onSelectPath}
    />
  );
};
