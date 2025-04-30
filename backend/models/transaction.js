import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Friend",
      required: true,
    },
    amount: { type: Number, required: true },
    direction: { type: String, enum: ["paid", "received"], required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
