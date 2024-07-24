const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3002;

app.use(bodyParser.json());

let accounts = [
    // Example account for testing purposes
    { accountId: "0", balance: 100 },
    { accountId: "2", balance: 200 }
  ];

app.put("/deposit", (req, res) => {
    const { balance, accountId } = req.body;
  
    // Log the account details before updating (for debugging)
    console.log(accounts[accountId]);
  
    // Update the account balance
    accounts[accountId].balance += balance ;
  
    // Respond with the updated balance
    res.status(201).json({ message: "Your Amount is updated", amount: accounts[accountId].balance });
  });


const generateAccountId = () => Math.random().toString(36).substring(2, 15);

app.post("/create-account",(req,res) => {
    const accountId = generateAccountId();
    accounts[accountId] = {balance: 0, transections: []};
    console.log("data......",accounts);
    res.status(200).json({message:"Your Account is created!", Account_Number: accountId})
});


app.listen(port, () => {
    console.log(`Bank app listening http://localhost:${port} `);
})