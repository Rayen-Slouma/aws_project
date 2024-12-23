const dbcreds = require('./DbConfig');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
});


function addTransaction(title,desc,owner){
    var mysql = `INSERT INTO \`transactions\` (\`title\`, \`description\`, \`owner\`) VALUES ('${title}','${desc}','${owner}')`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log("Adding to the table should have worked");
    }) 
    return 200;
}

function getAllTransactions(callback){
    var mysql = "SELECT * FROM transactions";
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log("Getting all transactions...");
        return(callback(result));
    });
}
function getAllTransactionsUser(login, callback){
    var mysql = `SELECT * FROM transactions WHERE owner = '${login}'`;
    con.query(mysql, function(err, result){
        if (err) throw err;
        console.log("Getting all transactions for user...");
        return(callback(result));
    });
}

function findTransactionById(id,callback){
    var mysql = `SELECT * FROM transactions WHERE id = ${id}`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log(`retrieving transactions with id ${id}`);
        return(callback(result));
    }) 
}

function deleteAllTransactions(owner, callback){
    var mysql = `DELETE FROM transactions WHERE owner = '${owner}'`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log(`Deleting all transactions for user ${owner}...`);
        return(callback(result));
    }) 
}

function deleteTransactionById(id, callback){
    var mysql = `DELETE FROM transactions WHERE id = ${id}`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log(`Deleting transactions with id ${id}`);
        return(callback(result));
    }) 
}

function deleteAllTransactionsByUser(owner, callback){
    var mysql = `DELETE FROM transactions WHERE owner = '${owner}'`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log(`Deleting all transactions for user ${owner}...`);
        return(callback(result));
    }) 
}

module.exports = {getAllTransactionsUser, addTransaction, getAllTransactions, deleteAllTransactions, deleteAllTransactionsByUser, findTransactionById, deleteTransactionById};







