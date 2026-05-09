import { clsx } from "clsx";

type EmptyStateProps = {
  title: string;
  description: string;
  markerClassName?: string;
};

export const EmptyState = ({ title, description, markerClassName }: EmptyStateProps) => {
  return (
    <div className="text-center">
      <div
        className={clsx(
          "mx-auto mb-4 rounded-lg border border-border-soft bg-slate-100",
          markerClassName ?? "size-14",
        )}
      />
      <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">{description}</p>
    </div>
  );
};
