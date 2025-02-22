import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ExpenseChart({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <div className="text-gray-400 text-center p-4">No data available</div>;
  }

  // Process transactions
  const data = transactions.reduce((acc, txn) => {
    const date = new Date(txn.date);
    const month = date.toLocaleString("default", { month: "short" });
    const fullDate = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    acc[month] = acc[month] || [];
    acc[month].push({ amount: txn.amount, date: fullDate });
    return acc;
  }, {});

  const chartData = Object.entries(data).map(([month, values]) => ({
    month,
    amount: values.reduce((sum, txn) => sum + txn.amount, 0),
    dates: values.map((txn) => txn.date).join(", "),
  }));

  console.log("Chart Data:", chartData); // Debugging

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl min-h-[300px]">
      <h2 className="text-2xl font-semibold text-green-500 text-center mb-4">📊 Monthly Expenses</h2>
      
      <div className="rounded-lg bg-white">
        <ResponsiveContainer width="100%" height={300} className="!bg-transparent">
          <BarChart data={chartData} barGap={5}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
            <XAxis dataKey="month" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.9)", 
                color: "#E5E7EB",
                borderRadius: "8px",
                border: "none",
              }}
              formatter={(value, name, props) => [`$${value}`, `Date(s): ${props.payload.dates}`]}
            />
            <Bar
              dataKey="amount"
              fill={({ payload }) => (payload.amount > 0 ? "#10B981" : "#EF4444")}
              radius={[8, 8, 0, 0]}
              animationDuration={800}
              background={{ fill: "transparent" }}
              className="hover:opacity-50 transition-opacity duration-300"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
