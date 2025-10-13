import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Texas Junk Boyz CRM",
  description: "Operational CRM and accounting for Texas Junk Boyz"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col p-6">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Texas Junk Boyz CRM</h1>
              <p className="text-sm text-slate-600">Field operations & accounting hub</p>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
