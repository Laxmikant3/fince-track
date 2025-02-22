"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpenseChart from "@/components/ExpenseChart";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
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
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-6">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-500">💰 Transactions</h1>
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all">
            📊 Go to Dashboard
          </button>
        </Link>
      </div>

      {/* Transactions & Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {/* Form Section */}
        <div className="bg-gray-900 p-4 rounded-lg shadow-md">
          <TransactionForm
            fetchTransactions={fetchTransactions}
            transactionToEdit={transactionToEdit}
            setTransactionToEdit={setTransactionToEdit}
          />
        </div>

        {/* Transaction List Section */}
        <div className="md:col-span-2 bg-gray-900 p-4 rounded-lg shadow-md">
          <TransactionList
            transactions={transactions}
            fetchTransactions={fetchTransactions}
            setTransactionToEdit={setTransactionToEdit}
          />
        </div>

        {/* Expense Chart Section */}
        <div className="md:col-span-3 bg-gray-900 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-green-400 mb-3">📊 Expense Breakdown</h2>
          <ExpenseChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
