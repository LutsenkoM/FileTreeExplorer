import { clsx } from "clsx";
import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  markerClassName?: string;
};

export const EmptyState = ({ title, description, icon, markerClassName }: EmptyStateProps) => {
  return (
    <div className="text-center">
      <div
        className={clsx(
          "mx-auto mb-4 flex items-center justify-center rounded-lg border border-border-soft bg-slate-100 text-primary",
          markerClassName ?? "size-14",
        )}
      >
        {icon}
      </div>
      <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">{description}</p>
    </div>
  );
};
