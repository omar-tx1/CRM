import type { ReactNode } from "react";

export const PageContainer = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <section className="space-y-4 p-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      </header>
      <div>{children}</div>
    </section>
  );
};
