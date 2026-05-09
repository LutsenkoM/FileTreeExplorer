import type { ReactNode } from "react";
import { clsx } from "clsx";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export const Panel = ({ children, className }: PanelProps) => {
  return (
    <div className={clsx("rounded-lg border border-border-soft bg-panel shadow-sm", className)}>
      {children}
    </div>
  );
};
