"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import './globals.css'
export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* Navbar */}
        <header className="w-full bg-gray-900 py-4 shadow-lg">
          <nav className="max-w-6xl mx-auto flex justify-between items-center px-6">
            <h1 className="text-3xl font-bold text-green-500">Fince-Track</h1>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className={`text-white font-medium hover:text-green-500 ${pathname === "/" ? "text-green-500" : ""}`}>
                  Transactions
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className={`text-white font-medium hover:text-green-500 ${pathname === "/dashboard" ? "text-green-500" : ""}`}>
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
