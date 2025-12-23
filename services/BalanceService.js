function addBalance(user, owesTo, amount) {
    if (!user.balanceSheet[owesTo]) {
      user.balanceSheet[owesTo] = 0;
    }
    user.balanceSheet[owesTo] += amount;
  }
  
  function simplifyBalances(users) {
    for (let u1 of Object.values(users)) {
      for (let u2Id in u1.balanceSheet) {
        const u2 = users[u2Id];
        if (!u2 || !u2.balanceSheet[u1.id]) continue;
  
        const minAmount = Math.min(
          u1.balanceSheet[u2Id],
          u2.balanceSheet[u1.id]
        );
  
        u1.balanceSheet[u2Id] -= minAmount;
        u2.balanceSheet[u1.id] -= minAmount;
  
        if (u1.balanceSheet[u2Id] === 0) delete u1.balanceSheet[u2Id];
        if (u2.balanceSheet[u1.id] === 0) delete u2.balanceSheet[u1.id];
      }
    }
  }
  
  module.exports = { addBalance, simplifyBalances };
  