export default function TransactionList({ transactions, fetchTransactions, setTransactionToEdit }) {
  async function deleteTransaction(id) {
    await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchTransactions();
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-white mb-4 text-center">📜 Transaction History</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">No transactions yet.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((txn) => (
            <li
              key={txn._id}
              className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
                txn.amount < 0 ? "bg-red-100 border-l-4 border-red-500" : "bg-green-100 border-l-4 border-green-500"
              }`}
            >
              <div>
                <p className="font-medium text-gray-700">{txn.description}</p>
                <p className="text-sm text-gray-500">
                  <span className={`font-bold ${txn.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                    ${txn.amount}
                  </span>{" "}
                  | {new Date(txn.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setTransactionToEdit(txn)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTransaction(txn._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
