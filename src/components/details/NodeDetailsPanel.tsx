import { useTreeExplorer } from "../../context/treeContext/useTreeExplorer";
import { EmptyState } from "../ui/EmptyState";
import { NodeDetailsContent } from "./NodeDetailsContent";

export const NodeDetailsPanel = () => {
  const { selectedNode, selectedPath } = useTreeExplorer();

  if (!selectedNode || !selectedPath) {
    return (
      <EmptyState
        title="Select a file or folder"
        description="Choose a node from the tree to see details."
        markerClassName="size-16"
      />
    );
  }

  return <NodeDetailsContent node={selectedNode} nodePath={selectedPath} />;
};
