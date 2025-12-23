const express = require("express");
const router = express.Router();

const { users } = require("./userRoutes");
const { groups } = require("./groupRoutes");
const { addExpense } = require("../services/ExpenseService");

router.post("/", (req, res) => {
  const { groupId, paidBy, amount, splitType, splitDetails } = req.body;
  addExpense(groups[groupId], users, paidBy, amount, splitType, splitDetails);
  res.json({ message: "Expense added successfully" });
});

module.exports = router;
