import "../styles/globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-[#1C1C1C] px-6 py-3 flex justify-center space-x-6">
          <Link
            href="/addSchool"
className="font-medium hover:text-[#4285F4] transition-colors"          >
            Add School
          </Link>
          <Link
            href="/showSchool"
className="font-medium hover:text-[#4285F4] transition-colors"          >
            Show Schools
          </Link>
        </nav>
        <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}