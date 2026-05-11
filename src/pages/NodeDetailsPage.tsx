import { useParams } from "react-router-dom";
import { NodeDetailsContent } from "../components/details/NodeDetailsContent";
import { PageContainer } from "../components/layout/PageContainer";
import { EmptyState } from "../components/ui/EmptyState";
import { Panel } from "../components/ui/Panel";
import { ROUTES } from "../constants/routes";
import { getStoredTree } from "../storage/treeStorage";
import { encodeNodePath, findNodeByPath } from "../utils/tree/path";

const decodeNodePath = (nodePath: string) => {
  return nodePath.split("/").map(decodeURIComponent).join("/");
};

const createNodeDetailsHref = (nodePath: string) => {
  return `${ROUTES.TREE}/${encodeNodePath(nodePath)}`;
};

export const NodeDetailsPage = () => {
  const params = useParams();
  const nodePath = decodeNodePath(params["*"] ?? "");
  const tree = getStoredTree();
  const node = tree && nodePath ? findNodeByPath(tree, nodePath) : null;

  return (
    <PageContainer
      title="Node Details"
      description="Details for the selected file or folder from the loaded tree."
    >
      <Panel className="max-w-4xl p-8">
        {node ? (
          <NodeDetailsContent
            getChildHref={createNodeDetailsHref}
            node={node}
            nodePath={nodePath}
          />
        ) : (
          <EmptyState
            title="Node not found"
            description="The requested file or folder does not exist in the loaded tree."
            markerClassName="size-16"
          />
        )}
      </Panel>
    </PageContainer>
  );
};
