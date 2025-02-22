"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function Layout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <header className="w-full bg-gray-900 py-4 shadow-lg">
          <nav className="max-w-6xl mx-auto flex justify-between items-center px-6">
           
            <h1 className="text-3xl font-bold text-green-500">Fince-Track</h1>

            <ul className="flex gap-6 text-lg">
              <li>
                <Link 
                  href="/" 
                  className={`font-medium hover:text-green-500 transition-all ${pathname === "/" ? "text-green-500 border-b-2 border-green-500 pb-1" : "text-white"}`}
                >
                  Transactions
                </Link>
              </li>
              <li>
                <Link 
                  href="/dashboard" 
                  className={`font-medium hover:text-green-500 transition-all ${pathname === "/dashboard" ? "text-green-500 border-b-2 border-green-500 pb-1" : "text-white"}`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/budgeting" 
                  className={`font-medium hover:text-yellow-400 transition-all ${pathname === "/budgeting" ? "text-yellow-400 border-b-2 border-yellow-400 pb-1" : "text-white"}`}
                >
                  Budgeting
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
