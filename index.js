// index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

let accounts = {};

// Helper function to generate account IDs
const generateAccountId = () => Math.random().toString(36).substring(2, 15);

// Routes

// Create Account
app.post('/create-account', (req, res) => {
  const accountId = generateAccountId();
  accounts[accountId] = { balance: 0, transactions: [] };
  res.json({ message: 'Account created', accountId });
});

// Deposit Money
app.post('/deposit', (req, res) => {
  const { accountId, amount } = req.body;
  if (!accounts[accountId]) {
    return res.status(404).json({ message: 'Account not found' });
  }
  accounts[accountId].balance += amount;
  accounts[accountId].transactions.push({ type: 'deposit', amount, date: new Date() });
  res.json({ message: 'Deposit successful', balance: accounts[accountId].balance });
});

// Withdraw Money
app.post('/withdraw', (req, res) => {
  const { accountId, amount } = req.body;
  if (!accounts[accountId]) {
    return res.status(404).json({ message: 'Account not found' });
  }
  if (accounts[accountId].balance < amount) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }
  accounts[accountId].balance -= amount;
  accounts[accountId].transactions.push({ type: 'withdraw', amount, date: new Date() });
  res.json({ message: 'Withdrawal successful', balance: accounts[accountId].balance });
});

// Check Balance
app.get('/balance/:accountId', (req, res) => {
  const accountId = req.params.accountId;
  if (!accounts[accountId]) {
    return res.status(404).json({ message: 'Account not found' });
  }
  res.json({ balance: accounts[accountId].balance });
});

// Transfer Money
app.post('/transfer', (req, res) => {
  const { fromAccountId, toAccountId, amount } = req.body;
  if (!accounts[fromAccountId] || !accounts[toAccountId]) {
    return res.status(404).json({ message: 'One or both accounts not found' });
  }
  if (accounts[fromAccountId].balance < amount) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }
  accounts[fromAccountId].balance -= amount;
  accounts[toAccountId].balance += amount;
  accounts[fromAccountId].transactions.push({ type: 'transfer-out', to: toAccountId, amount, date: new Date() });
  accounts[toAccountId].transactions.push({ type: 'transfer-in', from: fromAccountId, amount, date: new Date() });
  res.json({ message: 'Transfer successful', fromBalance: accounts[fromAccountId].balance, toBalance: accounts[toAccountId].balance });
});

// Statement History
app.get('/statement/:accountId', (req, res) => {
  const accountId = req.params.accountId;
  if (!accounts[accountId]) {
    return res.status(404).json({ message: 'Account not found' });
  }
  res.json({ transactions: accounts[accountId].transactions });
});

app.listen(port, () => {
  console.log(`Bank app listening at http://localhost:${port}`);
});
