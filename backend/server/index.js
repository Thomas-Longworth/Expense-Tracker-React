const express = require('express')
const app = express();
const cors = require('cors')
const path = require('path')
require("dotenv").config()
const supabaseClient = require('./supabase-client');

app.use(express.static(path.join(__dirname, 'dist')));
const port = process.env.PORT || 5000


var pg = require('pg');
require("dotenv").config()

//var conString = process.env.POSTGRESQL_CONNECT
                          
;

//middleware
app.use(cors())
app.use(express.json())

//create expense
/* app.post("/expenses", async (req, res, next) => {
    try {
        const { title, cost, userID, currentDate } = req.body;
        const newExpense = await client.query("INSERT INTO expense (title, cost, userID, dates) VALUES($1,$2, $3, $4) RETURNING *", [title, cost, userID, currentDate])
        res.json(newExpense.rows[0])

    }
    catch (err) {
        next(err)
    }
})
    */


app.post("/expenses", async (req, res, next) => {
    try {
        const { title, cost, userID, currentDate } = req.body;

        // Insert data using Supabase
        const { data, error } = await supabase
            .from("expenses") // Table name
            .insert([{ title, cost, userID, currentDate }])
            .select(); // Returns the inserted row

        if (error) throw error;

        res.json(data[0]); // Respond with the inserted row
    } catch (err) {
        next(err);
    }
});
/*
//get all expenses
app.get("/expenses", async (req, res) => {
    console.log("hello")
    try {
        const allExpenses = await client.query("SELECT * FROM expense")
        res.json(allExpenses.rows)
    }
    catch (err) {
        next(err)
    }
})

//get all one users exprenses
app.get("/expenses/:ids", async (req, res) => {
    
    try {
        const { ids } = req.params
        const oneExpense = await client.query("SELECT * FROM expense WHERE userID = $1", [ids])
        res.json(oneExpense.rows)
    }
    catch (err) {
        console.error(err.message)
    }
})

app.get("/search/:ids", async (req, res, next) => {
    console.log("hello seraching")
    try {
        const { title } = req.query;
        const {ids} = req.params
        console.log(title)
 
    
        const searchExpenses = await client.query(
            "SELECT * FROM expense WHERE title ILIKE $1 AND userID = $2", 
            [`%${title}%`, ids]  
        );
        res.json(searchExpenses.rows);
    } 
    catch (err) {
        next(err);
    }
});



//Edit an expense
app.put("/expenses/:id/", async (req, res) => {
    try {
        const { id } = req.params
        const { title, cost } = req.body

        const editExpense = await client.query("UPDATE expense SET (title, cost) =($1,$2) WHERE expense_id=$3 RETURNING *  ", [title, cost, id])

        res.json(editExpense.rows[0])

    }
    catch (err) {
        console.error(err.message)
    }
})

//Delete an expense

app.delete("/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteExpense = await client.query("DELETE FROM expense WHERE expense_id = $1", [id])
        res.json(deleteExpense)
    }
    catch (err) {
        console.error(err.message)
    }
})

//Budget create a new one!)

app.post('/budget', async (req, res) => {

    try {
        const { total_budget, userID } = req.body;

        const createBudget = await client.query('INSERT INTO budget (total_budget, userID) VALUES($1,$2) RETURNING  *', [total_budget, userID])

        res.json(createBudget.rows[0])
    }
    catch (err) {
        console.error(err.message)
    }

})

//Budget update
//Budget get the first budget row
app.get('/budget/:ids', async (req, res) => {
    try {
        const { ids } = req.params
        const getBudget = await client.query("SELECT * FROM budget WHERE userID =$1 ORDER BY budget_id DESC LIMIT 1", [ids]);
        res.json(getBudget.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//ORDER BY budget_id DESC LIMIT 1
*/
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});




app.all('*', (req, res, next) => {

    const err = new Error('Cant find this page on the server!')
    err.status = 'fail';
    err.statusCode = 404

    next(err)
});

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        also: console.error("Error handle middelare")
    })
})

app.listen(port, () => {
    console.log("server has started on port 5000")
})


