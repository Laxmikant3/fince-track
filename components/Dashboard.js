"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const text = await res.text(); // Get response as text
      if (!text) {
        console.warn("Empty response from API");
        setTransactions([]);
        return;
      }
  
      const data = JSON.parse(text); // Convert to JSON
      setTransactions(data);
      processSummaryData(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  
  function processSummaryData(data) {
    const total = data.reduce((sum, txn) => sum + parseFloat(txn.amount), 0);
    setTotalExpenses(total);

    const categoryMap = {};
    data.forEach((txn) => {
      categoryMap[txn.category] = (categoryMap[txn.category] || 0) + parseFloat(txn.amount);
    });

    setCategoryData(
      Object.keys(categoryMap).map((category) => ({
        name: category,
        value: categoryMap[category],
      }))
    );
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0"];

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-6">📊 Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-4xl mb-6">
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-400">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-400">₹{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-400">Categories Tracked</h3>
          <p className="text-2xl font-bold text-blue-400">{categoryData.length}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-400">Recent Transactions</h3>
          <p className="text-2xl font-bold text-green-400">{transactions.length}</p>
        </div>
      </div>

      {/* Category-wise Pie Chart */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-4xl flex flex-col items-center">
        <h3 className="text-xl font-bold text-white mb-4">Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-4xl mt-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
        <ul>
          {transactions.slice(0, 5).map((txn) => (
            <li key={txn._id} className="flex justify-between p-3 border-b border-gray-700">
              <span>{txn.description}</span>
              <span className="text-red-400">₹{txn.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
