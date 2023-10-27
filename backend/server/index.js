const express = require('express')
const app =express();
const cors =require('cors')

const port = process.env.PORT || 5000
const { Client } = require('pg'); 
const connectionString = "postgres://twqanulq:JibQhhCdJA7ZNyKBXhJRrJ7ESNVxxR6J@ruby.db.elephantsql.com/twqanulq"; 

const client = new Client({
  connectionString: connectionString,
});
client.connect();
//middleware
app.use(cors())
app.use(express.json())



app.post("/expenses", async(req, res, next)=> {
    try{
        const {title, cost, userID, currentDate}= req.body;
        const newExpense  = await client.query("INSERT INTO expense (title, cost, userID, dates) VALUES($1,$2, $3, $4) RETURNING *" , [title,cost, userID, currentDate])
        res.json(newExpense.rows[0])

    }
    catch (err){
        next(err)
    }

})

app.get("/expenses", async(req, res)=> {
    try{
        const allExpenses = await client.query("SELECT * FROM expense")
        res.json(allExpenses.rows)
    }
    catch(err){
          next(err)
    }
})
app.get("/expenses/:ids", async(req,res)=>{
    try {
        const { ids } = req.params
        const oneExpense = await client.query("SELECT * FROM expense WHERE userID = $1",[ids])
        res.json(oneExpense.rows)
    }   
    catch (err){
        console.error(err.message)
    }
})
//Edit an expense
app.put("/expenses/:id/", async(req, res)=> {
    try {
        const {id} = req.params
        const {title, cost} = req.body

        const editExpense = await client.query("UPDATE expense SET (title, cost) =($1,$2) WHERE expense_id=$3 RETURNING *  ",[title, cost, id])
        
        res.json(editExpense.rows[0])

    }
    catch (err){
        console.error(err.message)
    }
})

//Delete an expense

app.delete("/expenses/:id", async(req,res)=>{
    try {
        const {id}= req.params;
        const deleteExpense = await client.query("DELETE FROM expense WHERE expense_id = $1", [id])
        res.json(deleteExpense)
    }
    catch (err){
        console.error(err.message)
    }
})

//Budget create a new one!)

app.post('/budget', async(req,res)=> {

    try {
        const {total_budget, userID} = req.body;
       
        const createBudget = await client.query('INSERT INTO budget (total_budget, userID) VALUES($1,$2) RETURNING  *', [total_budget, userID]) 

        res.json(createBudget.rows[0])
    }
    catch (err){
        console.error(err.message)
    }

})

//Budget update
//Budget get the first budget row
app.get('/budget/:ids', async (req, res) => {
    try {
        const {ids } =req.params
        const getBudget = await client.query("SELECT * FROM budget WHERE userID =$1 ORDER BY budget_id DESC LIMIT 1",[ids]);
        res.json(getBudget.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//ORDER BY budget_id DESC LIMIT 1





app.all('*', (req, res, next) => {
    
    const err = new Error('Cant find this page on the server!')
    err.status='fail';
    err.statusCode = 404

    next(err)
});

app.use ((error,req,res, next)=>{
    error.statusCode= error.statusCode || 500
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: error.statusCode,
        message:error.message
    })
})

app.listen(port, ()=> {
    console.log("server has started on port 5000")
})


/*
app.put("/budget/:id", async(req, res)=> {
    try {
        const {id} = req.params
        const {total_budget} = req.body

        const editBudget= await client.query("UPDATE budget SET total_budget =($1) WHERE budget_id=$2 RETURNING *  ",[total_budget, id])
        
   
   

    }
    catch (err){
        console.error(err.message)
    }
})
*/