import type { FileNode } from "../../types/tree";
import { formatFileSize } from "../../utils/format/fileSize";
import { DetailsRow } from "./DetailsRow";

type FileDetailsProps = {
  node: FileNode;
  nodePath: string;
};

export const FileDetails = ({ node, nodePath }: FileDetailsProps) => {
  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">File</p>
        <h2 className="mt-2 break-words text-2xl font-semibold text-slate-950">{node.name}</h2>
      </div>

      <dl className="space-y-4">
        <DetailsRow label="Name" value={node.name} />
        <DetailsRow label="Size" value={formatFileSize(node.size)} />
        <DetailsRow label="Full path" value={nodePath} />
      </dl>
    </section>
  );
};
