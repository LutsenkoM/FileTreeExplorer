import { Link } from "react-router-dom";
import { useTreeExplorer } from "../../context/treeContext/useTreeExplorer";
import { ROUTES } from "../../constants/routes";
import { encodeNodePath } from "../../utils/tree/path";
import { EmptyState } from "../ui/EmptyState";
import { NodeDetailsContent } from "./NodeDetailsContent";

export const NodeDetailsPanel = () => {
  const { selectPath, selectedNode, selectedPath } = useTreeExplorer();

  if (!selectedNode || !selectedPath) {
    return (
      <EmptyState
        title="Select a file or folder"
        description="Choose a node from the tree to see details."
        markerClassName="size-16"
      />
    );
  }

  const detailsLink = (
    <Link
      className="text-sm font-medium text-primary underline underline-offset-4"
      to={`${ROUTES.TREE}/${encodeNodePath(selectedPath)}`}
    >
      Open details page
    </Link>
  );

  return (
    <NodeDetailsContent
      headerAction={detailsLink}
      node={selectedNode}
      nodePath={selectedPath}
      onSelectPath={selectPath}
    />
  );
};
