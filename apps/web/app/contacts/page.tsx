import Link from "next/link";
import { PageContainer } from "@tjb/ui";

const placeholderContacts = [
  { id: "1", name: "Sample Lead", phone: "555-0100", status: "Lead" }
];

export default function ContactsPage() {
  return (
    <PageContainer title="Contacts & Leads">
      <div className="flex justify-end">
        <Link href="#" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow">
          Add Contact
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Name</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Phone</th>
              <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {placeholderContacts.map((contact) => (
              <tr key={contact.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{contact.name}</td>
                <td className="px-4 py-3 text-slate-600">{contact.phone}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                    {contact.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}
