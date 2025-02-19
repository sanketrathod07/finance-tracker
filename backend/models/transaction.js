import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ["Food", "Entertainment", "Bills", "Shopping", "Others"] }
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
