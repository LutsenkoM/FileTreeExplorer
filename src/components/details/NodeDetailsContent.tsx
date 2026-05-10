import type { TreeNode } from "../../types/tree";
import { FileDetails } from "./FileDetails";
import { FolderDetails } from "./FolderDetails";

type NodeDetailsContentProps = {
  node: TreeNode;
  nodePath: string;
};

export const NodeDetailsContent = ({ node, nodePath }: NodeDetailsContentProps) => {
  if (node.type === "file") {
    return <FileDetails node={node} nodePath={nodePath} />;
  }

  return <FolderDetails node={node} nodePath={nodePath} />;
};
