/*
const express= require("express")
const configureDB=require("./config/db")
const userCltr=require("./app/controllers/user-ctrl")
const cors=require("cors")
const app=express()
configureDB()
app.use(express.json())
app.use(cors())
const port=3333

app.post('/users/register',userCltr.register,(req,res)=>{
    const body=req.body
    res.status(body)
})

app.listen(port,()=>{
    console.log("server running on port",port)
})
*/


/*

require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;;
const configureDB = require('./config/db');
const cors = require('cors');
const { checkSchema } = require('express-validator');



const userRegisterValidation = require('./app/validations/user-register-validations');
const userLoginValidation = require('./app/validations/user-login-validations');
const expensevalidationSchema = require('./app/validations/expense-validations');
const categoryValidationSchema = require('./app/validations/category-validations');



const userCltr  = require('./app/controllers/user-ctrl');
const authenticateUser = require('./app/middlewares/authenticateUser');
const expenseCltr = require('./app/controllers/expenses-ctrl');
const categoryCltr = require('./app/controllers/categories-ctrl');


app.use(express.json());
app.use(cors());
configureDB();


app.post('/users/register', checkSchema(userRegisterValidation), userCltr.register);
app.post('/users/login', checkSchema(userLoginValidation), userCltr.login);
app.get('/users/account', authenticateUser, userCltr.account);
app.put('/users/account', authenticateUser, userCltr.account)
app.post('/users/account', authenticateUser, userCltr.account)


app.post('/create-category', authenticateUser, checkSchema(categoryValidationSchema), categoryCltr.create);
app.get('/all-categories', categoryCltr.list);
app.get('/single-category/:id', categoryCltr.single);
app.put('/update-category/:id',categoryCltr.update);
app.delete('/removing-category/:id', authenticateUser,  categoryCltr.remove);


app.post('/create-expenses', authenticateUser, checkSchema(expensevalidationSchema), expenseCltr.create);
app.get('/all-expenses', expenseCltr.list);
app.get('/single-expense/:id', expenseCltr.single );
app.put('/update-expense/:id', authenticateUser,expenseCltr.update);
app.delete('/remove-expense/:id', authenticateUser,  expenseCltr.remove);





// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log('server running on port', port);
});

*/

require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const configureDB = require('./config/db');
const cors = require('cors');
const { checkSchema } = require('express-validator');

const userRegisterValidation = require('./app/validations/user-register-validations');
const userLoginValidation = require('./app/validations/user-login-validations');
const expenseValidationSchema = require('./app/validations/expense-validations');
const categoryValidationSchema = require('./app/validations/category-validations');

const userCltr = require('./app/controllers/user-ctrl');
const authenticateUser = require('./app/middlewares/authenticateUser');
const expenseCltr = require('./app/controllers/expenses-ctrl');
const categoryCltr = require('./app/controllers/categories-ctrl');

app.use(express.json());
app.use(cors({
    origin: 'https://expense-app-frontend-jegs.vercel.app/', // Update with your actual frontend URL
    credentials: true
}));
configureDB();

app.post('/users/register', checkSchema(userRegisterValidation), userCltr.register);
app.post('/users/login', checkSchema(userLoginValidation), userCltr.login);
app.get('/users/account', authenticateUser, userCltr.account);
app.put('/users/account', authenticateUser, userCltr.account);
app.post('/users/account', authenticateUser, userCltr.account);
app.get('/users',userCltr.list)

app.post('/create-category', authenticateUser, checkSchema(categoryValidationSchema), categoryCltr.create);
app.get('/all-categories', categoryCltr.list);
app.get('/single-category/:id', categoryCltr.single);
app.put('/update-category/:id', categoryCltr.update);
app.delete('/removing-category/:id', categoryCltr.remove);

app.post('/create-expenses', authenticateUser, checkSchema(expenseValidationSchema), expenseCltr.create);
app.get('/all-expenses', expenseCltr.list);
app.get('/single-expense/:id', expenseCltr.single);
app.put('/update-expense/:id', authenticateUser, expenseCltr.update);
app.delete('/remove-expense/:id', expenseCltr.remove);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log('server running on port', port);
});
