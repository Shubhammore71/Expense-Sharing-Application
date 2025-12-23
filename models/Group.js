const { v4: uuid } = require("uuid");

class Group {
  constructor(name, users) {
    this.id = uuid();
    this.name = name;
    this.users = users;
    this.expenses = [];
  }
}

module.exports = Group;
