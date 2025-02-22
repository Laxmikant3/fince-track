import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-1">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-green-400">FinanceTracker</h2>
          <p className="mt-2 text-sm">
            Your trusted financial companion for tracking expenses, budgeting, and more.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-green-400">🏠 Home</Link></li>
            <li><Link href="/transactions" className="hover:text-green-400">💰 Transactions</Link></li>
            <li><Link href="/dashboard" className="hover:text-green-400">📊 Dashboard</Link></li>
            <li><Link href="/budgeting" className="hover:text-yellow-400">🎯 Budgeting</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Support</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400">📞 +1 800 123 4567</a></li>
            <li><a href="#" className="hover:text-green-400">📧 support@financetracker.com</a></li>
            <li><a href="#" className="hover:text-green-400">❓ Help Center</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
          <form className="mt-3 flex">
            <input 
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full bg-gray-800 text-white rounded-l-lg outline-none border-none"
            />
            <button className="bg-green-500 px-4 py-2 rounded-r-lg text-white font-semibold hover:bg-green-600">
              Subscribe
            </button>
          </form>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-xl hover:text-white">📘</a>
            <a href="#" className="text-xl hover:text-white">🐦</a>
            <a href="#" className="text-xl hover:text-white">📸</a>
            <a href="#" className="text-xl hover:text-white">🔗</a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} FinanceTracker. All rights reserved. |  
        <Link href="#" className="ml-2 hover:text-green-400">Privacy Policy</Link> |
        <Link href="#" className="ml-2 hover:text-green-400">Terms of Service</Link>
      </div>
    </footer>
  );
}
