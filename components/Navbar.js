import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <ul className="flex justify-center gap-6 text-white">
        <li>
          <Link href="/" className="hover:text-green-400">Home</Link>
        </li>
        <li>
          <Link href="/transactions" className="hover:text-green-400">Transactions</Link>
        </li>
        <li>
          <Link href="/dashboard" className="hover:text-green-400">Dashboard</Link>
        </li>
        <li>
          <Link href="/budgeting" className="hover:text-yellow-400">Budgeting</Link>
        </li>
      </ul>
    </nav>
  );
}
