import { clsx } from "clsx";
import type { ReactNode } from "react";
import type { FolderNode } from "../../types/tree";
import { formatFileSize } from "../../utils/format/fileSize";
import { buildNodePath } from "../../utils/tree/path";
import { getNodeSize } from "../../utils/tree/size";
import { DetailsRow } from "./DetailsRow";

type FolderDetailsProps = {
  node: FolderNode;
  nodePath: string;
  headerAction?: ReactNode;
  onSelectPath?: (nodePath: string) => void;
};

export const FolderDetails = ({
  node,
  nodePath,
  headerAction,
  onSelectPath,
}: FolderDetailsProps) => {
  return (
    <section>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Folder</p>
          <h2 className="mt-2 break-words text-2xl font-semibold text-slate-950">{node.name}</h2>
        </div>

        {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
      </div>

      <dl className="space-y-4">
        <DetailsRow label="Name" value={node.name} />
        <DetailsRow label="Direct children" value={node.children.length} />
        <DetailsRow label="Total size" value={formatFileSize(getNodeSize(node))} />
        <DetailsRow label="Full path" value={nodePath} />
      </dl>

      <div className="mt-8 border-t border-border-soft pt-6">
        <h3 className="text-sm font-semibold text-slate-950">Children</h3>

        {node.children.length > 0 ? (
          <ul className="mt-3 divide-y divide-border-soft rounded-md border border-border-soft">
            {node.children.map((child) => {
              const childPath = buildNodePath(nodePath, child.name);
              const childContent = (
                <>
                  <div className="min-w-0">
                    <p
                      className={clsx(
                        "truncate text-sm font-medium",
                        onSelectPath
                          ? "text-primary underline underline-offset-4"
                          : "text-slate-950",
                      )}
                    >
                      {child.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted">{childPath}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted">{child.type}</span>
                </>
              );

              return (
                <li key={childPath}>
                  {onSelectPath ? (
                    <button
                      className="flex w-full items-center justify-between gap-4 px-3 py-2 text-left"
                      onClick={() => onSelectPath(childPath)}
                      type="button"
                    >
                      {childContent}
                    </button>
                  ) : (
                    <div className="flex items-center justify-between gap-4 px-3 py-2">
                      {childContent}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted">This folder is empty.</p>
        )}
      </div>
    </section>
  );
};
