"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import Footer from "@/components/Footer";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="flex-grow flex flex-col items-center p-6">
        <div className="w-full max-w-4xl flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-500">💰 Transactions</h1>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all">
                📊 Dashboard
              </button>
            </Link>
            <Link href="/budgeting">
              <button className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                🎯 Budgeting
              </button>
            </Link>
          </div>
        </div>

        <div className="flex w-full max-w-4xl gap-6">
          <div className="w-1/3 bg-gray-900 p-4 rounded-lg shadow-md">
            <TransactionForm fetchTransactions={fetchTransactions} transactionToEdit={transactionToEdit} setTransactionToEdit={setTransactionToEdit} />
          </div>
          <div className="w-2/3 bg-gray-900 p-4 rounded-lg shadow-md">
            <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} setTransactionToEdit={setTransactionToEdit} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
