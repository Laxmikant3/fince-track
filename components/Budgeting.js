"use client";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Budgeting() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});
  
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

  const categories = ["Food", "Entertainment", "Bills", "Shopping", "Others"];
  const categorySpending = categories.map(category => {
    const totalSpent = transactions
      .filter(t => t.category === category)
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    return { category, totalSpent, budget: budgets[category] || 0 };
  });

  function handleBudgetChange(category, value) {
    setBudgets(prev => ({ ...prev, [category]: value }));
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">📊 Budgeting</h1>

      <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-yellow-300">Set Monthly Budgets</h2>
        {categories.map(category => (
          <div key={category} className="flex justify-between items-center mb-3">
            <span className="text-white">{category}:</span>
            <input
              type="number"
              className="p-2 bg-gray-800 text-white rounded-md w-24"
              value={budgets[category] || ""}
              onChange={(e) => handleBudgetChange(category, e.target.value)}
              placeholder="Set Budget"
            />
          </div>
        ))}
      </div>

      <div className="w-full max-w-4xl bg-gray-900 p-6 mt-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-yellow-300">Budget vs. Actual</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categorySpending}
              dataKey="totalSpent"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {categorySpending.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.totalSpent > entry.budget ? "#ff4d4d" : "#4caf50"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
