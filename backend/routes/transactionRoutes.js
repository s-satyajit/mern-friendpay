import express from "express";
import Transaction from "../models/transaction.js";
import Friend from "../models/friend.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { friend, amount, direction } = req.body;
    const friendData = await Friend.findById(friend);
    if (!friendData) {
      return res.status(404).json({ message: "Friend not found" });
    }

    const repaymentDays =
      direction === "paid" ? friendData.repaymentPeriod : 30;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + repaymentDays);

    const newTransaction = await Transaction.create({
      date: new Date(),
      friend,
      amount,
      direction,
      dueDate,
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("friend", "name repaymentPeriod")
      .sort({ dueDate: 1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching transactions",
      error: error.message,
    });
  }
});

export default router;
