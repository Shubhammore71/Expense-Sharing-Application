# Expense Sharing Application (Splitwise-like)

## Overview
This project is a simplified backend implementation of an expense sharing application similar to Splitwise. The system allows users to create groups, add shared expenses, track balances, and settle dues.

The focus of this implementation is correctness of business logic, clean design, and clear separation of responsibilities.

---

## Assumptions
- Single currency is used
- No authentication or authorization
- In-memory data storage
- Groups have a limited number of users
- Expenses are immutable once added

---

## Core Entities

### User
- id
- name
- balanceSheet (tracks who the user owes)

### Group
- id
- name
- users
- expenses

### Expense
- paidBy
- amount
- splits

---

## Expense Splitting Logic

### Equal Split
Total amount is divided equally among all group members.

### Exact Split
Each user pays a specific amount defined explicitly.

### Percentage Split
Each user pays a percentage of the total amount.

---

## Balance Tracking
If user A pays for user B, then B owes A the split amount.  
Balances are tracked per user in a balance sheet.

---

## Balance Simplification
To avoid circular debts:
- If A owes B ₹100 and B owes A ₹60
- Final balance: A owes B ₹40

This is handled automatically after every expense.

---

## API Design

### Create User
POST /users

### Create Group
POST /groups

### Add Expense
POST /expenses

---

## Trade-offs & Future Improvements
- Replace in-memory storage with a database
- Add authentication
- Support expense editing
- Add settlement history

---

## Conclusion
This design prioritizes clarity, correctness, and extensibility. The system cleanly separates data models, business logic, and APIs, making it easy to maintain and scale.
