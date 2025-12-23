const express = require("express");
const User = require("../models/User");
const router = express.Router();

const users = {};

router.post("/", (req, res) => {
  const user = new User(req.body.name);
  users[user.id] = user;
  res.json(user);
});

router.get("/", (req, res) => {
  res.json(users);
});

module.exports = router;
module.exports.users = users;
