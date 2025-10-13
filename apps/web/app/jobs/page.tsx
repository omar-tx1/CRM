import { PageContainer } from "@tjb/ui";

const pipeline = [
  { stage: "Lead", count: 1 },
  { stage: "Quote", count: 0 },
  { stage: "Scheduled", count: 0 },
  { stage: "In-Progress", count: 0 },
  { stage: "Completed", count: 0 },
  { stage: "Invoiced", count: 0 },
  { stage: "Paid", count: 0 }
];

export default function JobsPage() {
  return (
    <PageContainer title="Jobs Pipeline">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pipeline.map((step) => (
          <div key={step.stage} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-600">{step.stage}</p>
            <p className="text-3xl font-semibold text-slate-900">{step.count}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
