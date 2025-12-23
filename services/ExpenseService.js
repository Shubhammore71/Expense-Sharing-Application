const Expense = require("../models/Expense");
const { addBalance, simplifyBalances } = require("./BalanceService");

function addExpense(group, users, paidBy, amount, splitType, splitDetails) {
  let splits = {};

  if (splitType === "EQUAL") {
    const share = amount / group.users.length;
    group.users.forEach(u => splits[u] = share);
  }

  if (splitType === "EXACT") {
    splits = splitDetails;
  }

  if (splitType === "PERCENT") {
    for (let u in splitDetails) {
      splits[u] = (splitDetails[u] / 100) * amount;
    }
  }

  group.expenses.push(new Expense(paidBy, amount, splits));

  for (let userId in splits) {
    if (userId !== paidBy) {
      addBalance(users[userId], paidBy, splits[userId]);
    }
  }

  simplifyBalances(users);
}

module.exports = { addExpense };
