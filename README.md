# Bank API

This is a Node.js API that simulates a bank with functionalities for creating accounts, depositing/withdrawing money, transferring funds, and checking account balance and transaction history.

## Features

- Create new bank accounts
- Deposit money
- Withdraw money
- Check account balance
- Transfer money between accounts
- View transaction history

## Installation

1. Clone the repository
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

The server will start running at `http://localhost:3000`.

## API Endpoints

### Create Account
- **POST** `/create-account`
- Creates a new bank account with a unique ID

### Deposit Money
- **POST** `/deposit`
- Deposits money into an existing account

### Withdraw Money
- **POST** `/withdraw`
- Withdraws money from an existing account

### Check Balance
- **GET** `/balance/:accountId`
- Retrieves the current balance of an account

### Transfer Money
- **POST** `/transfer`
- Transfers money between two existing accounts

### View Statement
- **GET** `/statement/:accountId`
- Retrieves the transaction history of an account

## Data Structure

The API uses an in-memory object to store account information:

```javascript
{
  accountId: {
    balance: number,
    transactions: [
      {
        type: string,
        amount: number,
        date: Date
      }
    ]
  }
}
```

## Dependencies
- express
- body-parser
- nodemon (for development)
## Scripts
`npm start`: Starts the server using nodemon for auto-reloading during development
