import Link from "next/link";
import { PageContainer } from "@tjb/ui";

const quotes = [
  { id: "Q-1001", contact: "Sample Lead", total: "$150", status: "Draft" }
];

export default function QuotesPage() {
  return (
    <PageContainer title="Quotes">
      <div className="flex justify-end">
        <Link href="#" className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow">
          New Quote
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Quote #</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Contact</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Total</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{quote.id}</td>
                <td className="px-4 py-3 text-slate-600">{quote.contact}</td>
                <td className="px-4 py-3 text-slate-600">{quote.total}</td>
                <td className="px-4 py-3 text-slate-600">{quote.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
