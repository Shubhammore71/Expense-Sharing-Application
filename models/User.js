const { v4: uuid } = require("uuid");

class User {
  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.balanceSheet = {}; 
    // balanceSheet[userId] = amount owed
  }
}

module.exports = User;
