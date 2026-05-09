import { useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";

export const HomePage = () => {
  const [jsonInput, setJsonInput] = useState("");
  const isLoadDisabled = jsonInput.trim().length === 0;

  return (
    <PageContainer
      title="Welcome to FileTree Explorer"
      description="Paste or upload a JSON file that represents a file structure."
    >
      <Panel className="max-w-4xl p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-950">JSON input</h2>
            <p className="mt-1 text-sm text-muted">Add file tree JSON to continue.</p>
          </div>

          <label className="inline-flex cursor-pointer items-center rounded-md border border-border-soft bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Upload JSON file
            <input accept="application/json,.json" className="sr-only" type="file" />
          </label>
        </div>

        <textarea
          className="min-h-80 w-full resize-y rounded-md border border-border-soft bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-950 shadow-inner outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          onChange={(event) => setJsonInput(event.target.value)}
          placeholder='{"name":"root","type":"folder","children":[]}'
          spellCheck={false}
          value={jsonInput}
        />

        <div className="mt-4 min-h-6 text-sm text-muted">Validation message will appear here.</div>

        <div className="mt-6 flex justify-end">
          <Button disabled={isLoadDisabled}>Load JSON</Button>
        </div>
      </Panel>
    </PageContainer>
  );
};
