import { ExternalLink, MousePointerClick } from "lucide-react";
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
      <div className="flex min-h-full items-center justify-center">
        <EmptyState
          title="Select a file or folder"
          description="Choose a node from the tree to see details."
          icon={<MousePointerClick size={32} />}
          markerClassName="size-16"
        />
      </div>
    );
  }

  const detailsLink = (
    <Link
      aria-label="Open details page"
      className="!text-primary"
      to={`${ROUTES.TREE}/${encodeNodePath(selectedPath)}`}
      title="Open details page"
    >
      <ExternalLink size={24} />
    </Link>
  );

  return (
    <div className="w-full">
      <NodeDetailsContent
        headerAction={detailsLink}
        node={selectedNode}
        nodePath={selectedPath}
        onSelectPath={selectPath}
      />
    </div>
  );
};
