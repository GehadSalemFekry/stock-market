import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  priceAtTransaction: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;
