import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryChart({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <div className="text-gray-400 text-center p-4">No data available</div>;
  }

  // Group transactions by category
  const categoryData = transactions.reduce((acc, txn) => {
    const category = txn.category || "Others";
    acc[category] = (acc[category] || 0) + txn.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#6366F1"];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl min-h-[300px]">
      <h2 className="text-2xl font-semibold text-green-500 text-center mb-4">📊 Category-wise Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
