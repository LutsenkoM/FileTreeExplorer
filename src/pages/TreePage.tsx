import { FolderSearch, SearchX } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { NodeDetailsPanel } from "../components/details/NodeDetailsPanel";
import { TreeExplorerProvider } from "../context/treeContext/TreeExplorerProvider";
import { useTreeExplorer } from "../context/treeContext/useTreeExplorer";
import { TreeView } from "../components/tree/TreeView";
import { ClearDataButton } from "../components/ui/ClearDataButton";
import { EmptyState } from "../components/ui/EmptyState";
import { Panel } from "../components/ui/Panel";
import { useTreeSearchParams } from "../hooks/useTreeSearchParams";
import { filterTreeBySearch } from "../utils/tree/search";

const TreePageContent = () => {
  const { clearTree, tree } = useTreeExplorer();
  const { clearSearch, searchInput, searchQuery, setSearchInput } = useTreeSearchParams();
  const searchMatch = tree && searchQuery ? filterTreeBySearch(tree, searchQuery) : null;
  const displayedTree = searchMatch?.tree ?? tree;
  const isSearching = Boolean(tree && searchQuery);

  const handleClearTree = () => {
    clearTree();
    clearSearch();
  };

  return (
    <PageContainer
      title="File Tree"
      description="Loaded tree data will be displayed here after JSON validation."
      actions={<ClearDataButton disabled={!tree} onClick={handleClearTree} />}
    >
      <Panel className="grid h-[calc(100vh-180px)] min-h-[620px] grid-cols-[minmax(360px,480px)_1fr] overflow-hidden">
        <section className="grid min-h-0 grid-rows-[auto_1fr] border-r border-border-soft">
          <div className="border-b border-border-soft p-5">
            <label className="sr-only" htmlFor="tree-search">
              Search files and folders
            </label>
            <input
              className="w-full rounded-md border border-border-soft bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:text-slate-500"
              disabled={!tree}
              id="tree-search"
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search files and folders..."
              type="search"
              value={searchInput}
            />
          </div>

          <div className="min-h-0 overflow-y-auto p-6 text-center">
            {displayedTree ? (
              <TreeView expandAll={isSearching} tree={displayedTree} />
            ) : isSearching ? (
              <div className="flex min-h-full items-center justify-center">
                <EmptyState
                  title="No search results"
                  description="Try another file or folder name."
                  icon={<SearchX size={28} />}
                  markerClassName="size-14 border-primary/20 bg-primary-soft"
                />
              </div>
            ) : (
              <div className="flex min-h-full items-center justify-center">
                <EmptyState
                  title="No tree loaded yet"
                  description="Load valid JSON from the Home page to render the expandable file tree."
                  icon={<FolderSearch size={28} />}
                  markerClassName="size-14 border-primary/20 bg-primary-soft"
                />
              </div>
            )}
          </div>
        </section>

        <section className="min-h-0 overflow-y-auto p-8">
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
