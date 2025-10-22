import Link from "next/link";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/contacts", label: "Contacts" },
  { href: "/jobs", label: "Jobs" },
  { href: "/calendar", label: "Calendar" },
  { href: "/quotes", label: "Quotes" },
  { href: "/invoices", label: "Invoices" },
  { href: "/map", label: "Map" }
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <p className="text-lg text-slate-700">
        Welcome to the Texas Junk Boyz CRM prototype. Choose a workspace to continue.
      </p>
      <nav className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-500"
          >
            <span className="text-base font-medium text-slate-900">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
