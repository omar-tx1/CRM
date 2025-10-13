import { PageContainer } from "@tjb/ui";

const invoices = [
  { id: "INV-2001", contact: "Sample Lead", total: "$275", balance: "$275", status: "Draft" }
];

export default function InvoicesPage() {
  return (
    <PageContainer title="Invoices">
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Invoice #</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Contact</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Total</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Balance</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{invoice.id}</td>
                <td className="px-4 py-3 text-slate-600">{invoice.contact}</td>
                <td className="px-4 py-3 text-slate-600">{invoice.total}</td>
                <td className="px-4 py-3 text-slate-600">{invoice.balance}</td>
                <td className="px-4 py-3 text-slate-600">{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
