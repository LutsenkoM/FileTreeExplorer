import type { ReactNode } from "react";

type PageContainerProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export const PageContainer = ({ title, description, actions, children }: PageContainerProps) => {
  return (
    <section className="min-h-screen px-8 py-8">
      <header className="mb-8 flex items-start justify-between gap-6 border-b border-border-soft pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
          {description ? <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p> : null}
        </div>

        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>

      {children}
    </section>
  );
};
