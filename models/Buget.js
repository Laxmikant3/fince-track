import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: String, enum: ["Food", "Bills", "Shopping", "Travel", "Entertainment", "Others"], required: true },
  amount: { type: Number, required: true }, // Budget limit for the category
  month: { type: String, required: true }, // "Feb-2025" format
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
