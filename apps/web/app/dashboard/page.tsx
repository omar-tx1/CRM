import { PageContainer } from "@tjb/ui";

const metrics = [
  { label: "Total Revenue", value: "$0" },
  { label: "Jobs This Month", value: "0" },
  { label: "Avg Job Value", value: "$0" },
  { label: "Pending Invoices", value: "0" },
  { label: "New Leads", value: "0" }
];

export default function DashboardPage() {
  return (
    <PageContainer title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-600">{metric.label}</p>
            <p className="text-2xl font-semibold text-slate-900">{metric.value}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
