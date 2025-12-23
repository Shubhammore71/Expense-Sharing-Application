console.log("Index.js loaded");

const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/expenses", expenseRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Expense Sharing App running on port ${PORT}`);
});
