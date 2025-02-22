import { useState, useEffect } from "react";

export default function TransactionForm({ fetchTransactions, transactionToEdit, setTransactionToEdit }) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });
  useEffect(() => {
    if (transactionToEdit) {
      setForm({
        amount: transactionToEdit.amount || "",
        date: transactionToEdit.date || "",
        description: transactionToEdit.description || "",
        category: transactionToEdit.category || "Food",
      });
    } else {
      setForm({ amount: "", date: "", description: "", category: "" });
    }
  }, [transactionToEdit]);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { ...form, amount: Number(form.amount) };

    const method = transactionToEdit ? "PUT" : "POST";
    const url = transactionToEdit
      ? `/api/transactions/${transactionToEdit._id}`
      : "/api/transactions";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    fetchTransactions();
    setTransactionToEdit(null); 
    setForm({ amount: "", date: "", description: "", category: "" }); 
  }

  return (
    <div className="w-full max-w-md bg-gray-900 p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        {transactionToEdit ? "✏️ Edit Transaction" : "💰 Add a Transaction"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition-all"
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="Food">🍔 Food</option>
          <option value="Bills">💡 Bills</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Travel">✈️ Travel</option>
          <option value="Entertainment">🎭 Entertainment</option>
          <option value="Others">🔖 Others</option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-all"
          >
            {transactionToEdit ? "Update Transaction" : "Add Transaction"}
          </button>
          {transactionToEdit && (
            <button
              type="button"
              onClick={() => setTransactionToEdit(null)}
              className="w-full py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 hover:scale-105 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
