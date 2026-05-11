import type { ChangeEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../components/layout/PageContainer";
import { Button } from "../components/ui/Button";
import { ClearDataButton } from "../components/ui/ClearDataButton";
import { Panel } from "../components/ui/Panel";
import { ROUTES } from "../constants/routes";
import { clearStoredTree, getStoredTree, saveStoredTree } from "../storage/treeStorage";
import { parseJson } from "../utils/validation/jsonValidation";
import { validateTreeNode } from "../utils/validation/treeValidation";

const VALIDATION_STATUS = {
  ERROR: "error",
} as const;

type ValidationStatus = {
  type: typeof VALIDATION_STATUS.ERROR;
  message: string;
};

const isJsonFile = (file: File) => {
  return file.type === "application/json" || file.name.toLowerCase().endsWith(".json");
};

const getInitialJsonInput = () => {
  const storedTree = getStoredTree();

  return storedTree ? JSON.stringify(storedTree, null, 2) : "";
};

export const HomePage = () => {
  const navigate = useNavigate();
  const [jsonInput, setJsonInput] = useState(getInitialJsonInput);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus | null>(null);
  const isLoadDisabled = jsonInput.trim().length === 0;

  const loadJsonInput = (value: string) => {
    const parsedJson = parseJson(value);

    if (!parsedJson.isValid) {
      setValidationStatus({
        type: VALIDATION_STATUS.ERROR,
        message: parsedJson.error,
      });
      return;
    }

    const validatedTree = validateTreeNode(parsedJson.data);

    if (!validatedTree.isValid) {
      setValidationStatus({
        type: VALIDATION_STATUS.ERROR,
        message: validatedTree.error,
      });
      return;
    }

    saveStoredTree(validatedTree.data);
    navigate(ROUTES.TREE);
  };

  const handleJsonInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
    setValidationStatus(null);
  };

  const handleLoadJson = () => {
    loadJsonInput(jsonInput);
  };

  const handleClearData = () => {
    clearStoredTree();
    setJsonInput("");
    setValidationStatus(null);
  };

  const handleJsonFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!isJsonFile(file)) {
      setValidationStatus({
        type: VALIDATION_STATUS.ERROR,
        message: "Please upload a JSON file.",
      });
      event.target.value = "";
      return;
    }

    try {
      const fileContent = await file.text();
      setJsonInput(fileContent);
    } catch {
      setValidationStatus({
        type: VALIDATION_STATUS.ERROR,
        message: "Could not read the selected file.",
      });
    }

    event.target.value = "";
  };

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
            <input
              accept="application/json,.json"
              className="sr-only"
              onChange={handleJsonFileUpload}
              type="file"
            />
          </label>
        </div>

        <textarea
          className="min-h-80 w-full resize-y rounded-md border border-border-soft bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-950 shadow-inner outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          onChange={handleJsonInputChange}
          placeholder='{"name":"root","type":"folder","children":[]}'
          spellCheck={false}
          value={jsonInput}
        />

        {validationStatus ? (
          <div className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-danger">
            {validationStatus.message}
          </div>
        ) : null}

        <div className="mt-6 flex justify-end gap-3">
          <ClearDataButton disabled={jsonInput.length === 0} onClick={handleClearData} />
          <Button disabled={isLoadDisabled} onClick={handleLoadJson}>
            Load JSON
          </Button>
        </div>
      </Panel>
    </PageContainer>
  );
};
