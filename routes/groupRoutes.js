const express = require("express");
const Group = require("../models/Group");
const router = express.Router();

const groups = {};

router.post("/", (req, res) => {
  const group = new Group(req.body.name, req.body.users);
  groups[group.id] = group;
  res.json(group);
});

router.get("/", (req, res) => {
  res.json(groups);
});

module.exports = router;
module.exports.groups = groups;
