const transactionService = require('./TransactionService');
const auth = require('./AuthService'); // Ensure AuthService is imported correctly
const emailService = require('./EmailService'); // Ensure EmailService is imported correctly
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');
const fetch = require('node-fetch');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// ROUTES FOR OUR API
// =======================================================

//Health Checking
app.get('/health',(req,res)=>{
    res.json("This is the health check");
});

// ADD TRANSACTION
app.post('/transaction', (req,res)=>{
    var response = "";
    try{
        console.log(req.body);
        console.log(req.body.title);
        console.log(req.body.desc);
        console.log(req.body.owner);
        var success = transactionService.addTransaction(req.body.title,req.body.desc,req.body.owner);
        if (success = 200) res.json({ message: 'added transaction successfully'});
    }catch (err){
        res.json({ message: 'something went wrong', error : err.message});
    }
});
/*
// GET ALL TRANSACTIONS
app.get('/transaction',(req,res)=>{
    try{
        var transactionList = [];
       transactionService.getAllTransactions(function (results) {
            console.log("we are in the call back:");
            for (const row of results) {
                transactionList.push({ "id": row.id, "title": row.title, "description": row.description });
            }
            console.log(transactionList);
            res.statusCode = 200;
            res.json({"result":transactionList});
        });
    }catch (err){
        res.json({message:"could not get all transactions",error: err.message});
    }
});*/
// GET ALL TRANSACTIONS for a user
app.get('/transaction/user/:owner',(req,res)=>{
    try{
        var transactionList = [];
        const owner = req.params.owner;
        transactionService.getAllTransactionsUser(owner, function (results) {
            console.log("we are in the call back:");
            for (const row of results) {
                transactionList.push({ "id": row.id, "title": row.title, "description": row.description });
            }
            console.log(transactionList);
            res.statusCode = 200;
            res.json({"result":transactionList});
        });
    }catch (err){
        res.json({message:"could not get all transactions",error: err.message});
    }
});

// DELETE ALL TRANSACTIONS for a user
app.delete('/transaction/user', (req, res) => {
    try {
        const owner = req.body.owner;
        transactionService.deleteAllTransactions(owner, function(result) {
            res.statusCode = 200;
            res.json({message: "delete function execution finished for user."})
        })
    } catch (err) {
        res.json({message: "Deleting all transactions for user may have failed.", error: err.message});
    }
});

//DELETE ALL TRANSACTIONS
app.delete('/transaction',(req,res)=>{
    try{
        transactionService.deleteAllTransactions(function(result){
            res.statusCode = 200;
            res.json({message:"delete function execution finished."})
        })
    }catch (err){
        res.json({message: "Deleting all transactions may have failed.", error:err.message});
    }
});

//DELETE ONE TRANSACTION
app.delete('/transaction/id', (req,res)=>{
    try{
        //probably need to do some kind of parameter checking
        transactionService.deleteTransactionById(req.body.id, function(result){
            res.statusCode = 200;
            res.json({message: `transaction with id ${req.body.id} seemingly deleted`});
        })
    } catch (err){
        res.json({message:"error deleting transaction", error: err.message});
    }
});

//GET SINGLE TRANSACTION
app.get('/transaction/id',(req,res)=>{
    //also probably do some kind of parameter checking here
    try{
        transactionService.findTransactionById(req.body.id,function(result){
            res.statusCode = 200;
            var id = result[0].id;
            var amt = result[0].title;
            var desc= result[0].desc;
            res.json({"id":id,"title":amt,"desc":desc});
        });

    }catch(err){
        res.json({message:"error retrieving transaction", error: err.message});
    }
});

// REGISTER USER
app.post('/register', (req, res) => {
    try {
        const { login, password, email } = req.body;

        // Input validation
        if (!login || !password || !email) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        auth.registerUser(login, password, email)
            .then(result => {
                res.status(201).json({
                    success: true,
                    message: 'User registered successfully',
                    userId: result.userId
                });
            })
            .catch(err => {
                // Handle duplicate entry error
                if (err.message === 'Username or email already exists') {
                    return res.status(409).json({
                        success: false,
                        message: err.message
                    });
                }

                res.status(500).json({
                    success: false,
                    message: 'Registration failed',
                    error: err.message
                });
            });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: err.message
        });
    }
});

// LOGIN USER
app.post('/login', (req, res) => {
    try {
        const { login, password } = req.body;

        // Input validation
        if (!login || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing login or password'
            });
        }

        auth.loginUser(login, password)
            .then(result => {
                if (!result.success) {
                    return res.status(401).json({
                        success: false,
                        message: result.message
                    });
                }

                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    userId: result.userId
                });
            })
            .catch(err => {
                console.error('Login error:', err);
                res.status(500).json({
                    success: false,
                    message: 'Login failed',
                    error: err.message
                });
            });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: err.message
        });
    }
});

// FORGOT PASSWORD
app.post('/forgot-password', async (req, res) => {
    try {
        const { login } = req.body;

        // Input validation
        if (!login) {
            return res.status(400).json({
                success: false,
                message: 'Missing login'
            });
        }

        await emailService.sendPasswordEmail(login);
        res.status(200).json({
            success: true,
            message: 'Password email sent successfully'
        });
    } catch (err) {
        if (err.message === 'User not found') {
            return res.status(404).json({
                success: false,
                message: 'User does not exist'
            });
        }
        console.error('Forgot password error:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to send password email',
            error: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`AB3 backend app listening at http://localhost:${port}`)
})
