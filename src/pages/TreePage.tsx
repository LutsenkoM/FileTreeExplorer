import { useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { TreePreview } from "../components/tree/TreePreview";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { Panel } from "../components/ui/Panel";
import { clearStoredTree, getStoredTree } from "../storage/treeStorage";

export const TreePage = () => {
  const [tree, setTree] = useState(() => getStoredTree());

  const handleClearTree = () => {
    clearStoredTree();
    setTree(null);
  };

  return (
    <PageContainer
      title="File Tree"
      description="Loaded tree data will be displayed here after JSON validation."
      actions={
        <Button disabled={!tree} onClick={handleClearTree} variant="secondary">
          Clear data
        </Button>
      }
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
              <TreePreview tree={tree} />
            ) : (
              <EmptyState
                title="No tree loaded yet"
                description="Load valid JSON from the Home page to render the expandable file tree."
                markerClassName="size-14 border-primary/20 bg-primary-soft"
              />
            )}
          </div>
        </section>

        <section className="flex items-center justify-center p-8 text-center">
          <EmptyState
            title="Select a file or folder"
            description="Node details will appear here after the tree renderer and route resolver are added."
            markerClassName="size-16"
          />
        </section>
      </Panel>
    </PageContainer>
  );
};
