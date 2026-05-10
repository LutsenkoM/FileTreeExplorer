import { PageContainer } from "../components/layout/PageContainer";
import { NodeDetailsPanel } from "../components/details/NodeDetailsPanel";
import { TreeExplorerProvider } from "../context/treeContext/TreeExplorerProvider";
import { useTreeExplorer } from "../context/treeContext/useTreeExplorer";
import { TreeView } from "../components/tree/TreeView";
import { ClearDataButton } from "../components/ui/ClearDataButton";
import { EmptyState } from "../components/ui/EmptyState";
import { Panel } from "../components/ui/Panel";

const TreePageContent = () => {
  const { clearTree, tree } = useTreeExplorer();

  return (
    <PageContainer
      title="File Tree"
      description="Loaded tree data will be displayed here after JSON validation."
      actions={<ClearDataButton disabled={!tree} onClick={clearTree} />}
    >
      <Panel className="grid min-h-[620px] grid-cols-[minmax(360px,480px)_1fr] overflow-hidden">
        <section className="border-r border-border-soft">
          <div className="border-b border-border-soft p-5">
            <label className="sr-only" htmlFor="tree-search">
              Search files and folders
            </label>
            <input
              className="w-full rounded-md border border-border-soft bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none"
              disabled
              id="tree-search"
              placeholder="Search files and folders..."
              type="search"
            />
          </div>

          <div className="flex min-h-[520px] p-6 text-center">
            {tree ? (
              <TreeView tree={tree} />
            ) : (
              <EmptyState
                title="No tree loaded yet"
                description="Load valid JSON from the Home page to render the expandable file tree."
                markerClassName="size-14 border-primary/20 bg-primary-soft"
              />
            )}
          </div>
        </section>

        <section className="p-8">
          <NodeDetailsPanel />
        </section>
      </Panel>
    </PageContainer>
  );
};

export const TreePage = () => {
  return (
    <TreeExplorerProvider>
      <TreePageContent />
    </TreeExplorerProvider>
  );
};
