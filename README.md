# Expense Sharing Application (Splitwise-like)

## Overview

This project implements a simplified backend for an **expense sharing application**, inspired by Splitwise. It allows users to:

- Create and manage groups
- Add shared expenses
- Track balances between users
- Settle dues

The focus is on **correctness of business logic**, **clean and modular design**, and **extensible APIs** for future improvements.

This project demonstrates **problem-solving, design thinking**, and the ability to implement **robust backend logic**.

---

## Key Assumptions

- Single currency system (all transactions in ₹)
- No authentication or authorization implemented
- In-memory storage (no persistent database)
- Groups have a limited number of users
- Expenses are **immutable** once added

---

## Core Entities

### User
Represents an individual participating in shared expenses.

**Attributes:**
- `id`: Unique identifier for the user
- `name`: Name of the user
- `balanceSheet`: Tracks balances with other users (who owes whom and how much)

### Group
Represents a group of users sharing expenses.

**Attributes:**
- `id`: Unique identifier for the group
- `name`: Name of the group
- `users`: List of users in the group
- `expenses`: List of expenses recorded in the group

### Expense
Represents a shared expense.

**Attributes:**
- `paidBy`: User who paid for the expense
- `amount`: Total expense amount
- `splits`: Distribution of the expense among users (equal, exact, or percentage)

---

## Expense Splitting Logic

1. **Equal Split**  
   - Expense is divided equally among all members.  
   - Example: ₹100 for 4 users → each owes ₹25.

2. **Exact Split**  
   - Each user is assigned a specific amount.  
   - Example: User B owes ₹30, User C owes ₹20, User D owes ₹50.

3. **Percentage Split**  
   - Expense is divided according to percentages assigned to each user.  
   - Example: User B owes 30%, User C owes 20%, User D owes 50% of ₹100.

---

## Balance Tracking

- Balances are **tracked per user** in a balance sheet.
- When a user pays for others, the split amount is recorded as owed to the payer.
- Balances **update automatically** after every expense.

### Balance Simplification
To avoid circular debts:

- If A owes B ₹100 and B owes A ₹60 → **net balance: A owes B ₹40**

This ensures **minimal outstanding balances** and easier settlements.

---

## System Diagram

```ascii
+------------+     +-----------+     +-----------+
|   User A   |     |   User B  |     |   User C  |
+------------+     +-----------+     +-----------+
       \             /                 /
        \           /                 /
         \         /                 /
          \       /                 /
           +-----> Group 1 <--------+
                     (Trip)
                  +-----------+
                  | Expenses  |
                  +-----------+
                  | Expense 1 |
                  | paidBy: A  |
                  | splits...  |
                  +-----------+
```

**Explanation:**
- Users belong to one or more groups.
- Groups contain multiple expenses.
- Each expense updates the **balance sheets** of involved users.
- Balance simplification ensures users only see **net amounts owed**.

---

## API Design

### 1. Create User
```http
POST /users
Request: { "name": "Alice" }
Response: { "id": 1, "name": "Alice" }
```

### 2. Create Group
```http
POST /groups
Request: { "name": "Trip", "userIds": [1, 2, 3] }
Response: { "id": 1, "name": "Trip", "users": [...] }
```

### 3. Add Expense
```http
POST /expenses
Request: {
  "groupId": 1,
  "paidBy": 1,
  "amount": 100,
  "splitType": "EQUAL",
  "splits": null
}
Response: { "id": 1, "paidBy": 1, "amount": 100, "splits": [...] }
```

*(Additional endpoints for retrieving balances, group expenses, settlements, etc., can be added as needed.)*

---

## Trade-offs & Future Improvements

### Current Trade-offs
- In-memory storage → data lost on restart
- No authentication → open access to all operations
- Expenses are immutable → no editing or deletion

### Future Improvements
- Integrate **persistent database** (e.g., MongoDB, PostgreSQL)
- Add **authentication & authorization**
- Support **expense editing and deletion**
- Maintain **settlement history and notifications**
- Enable **multi-currency support**
- Enhance APIs with **filtering, pagination, and analytics**

---

## Design Principles

- **Separation of Concerns**: Models, services, and routes are modular
- **Extensibility**: Easy to add new split types, currencies, or features
- **Correctness**: Accurate balance tracking and automatic simplification
- **Clarity**: Clean and intuitive API design for easy frontend integration

---

## Conclusion

This project provides a **clear, maintainable, and extensible backend** for an expense sharing application. It demonstrates strong **problem structuring, business logic implementation, and clean design principles**—making it suitable for production-grade extensions and company evaluation.
```
