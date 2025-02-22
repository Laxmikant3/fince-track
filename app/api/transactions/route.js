import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Transaction from "@/models/Transactions";

export async function GET() {
  try {
    await connectToDB();
    const transactions = await Transaction.find().sort({ date: -1 });

    return NextResponse.json(transactions || []); // Ensure response is always JSON
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDB();
    const { amount, date, description, category } = await req.json();

    if (!amount || !date || !description || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const transaction = new Transaction({ amount, date, description, category });
    await transaction.save();
    
    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectToDB();
    const { id } = await req.json();
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDB();
    const { id, amount, date, description, category } = await req.json();

    if (!id || !amount || !date || !description || !category) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true }
    );

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}
