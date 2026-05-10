import { useContext } from "react";
import { TreeExplorerContext } from "./TreeExplorerContext";

export const useTreeExplorer = () => {
  const context = useContext(TreeExplorerContext);

  if (!context) {
    throw new Error("useTreeExplorer must be used inside TreeExplorerProvider");
  }

  return context;
};
