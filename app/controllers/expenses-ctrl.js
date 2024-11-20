
/*const Expense=require("../models/expense-model")
const {validationResult}=require('express-validator')
const expenseCltr={}

expenseCltr.list=async(req,res)=>{
    try { 
        const expenses = await Expense.find() 
        res.json(expenses)
    } catch(err) {  
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
}


expenseCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const body = req.body 
    const expense = new Expense(body)  
    await expense.save()
    res.status(201).json(expense)
}


expenseCltr.single = async (req, res) => {
    try{
        const id = req.params.id
        const expense = await Expense.findById(id)
        res.status(200).json(expense)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong'})
    }
}




expenseCltr.update = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const id = req.params.id
        const body = req.body
        const expense= await Expense.findByIdAndUpdate(id,body,{new:true})
        if(!expense){
            return res.status(404).json({})
        }
        res.status(200).json(expense)
    }catch(err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong'})
    }
}

expenseCltr.remove = async (req, res) => {
    try{
        const id = req.params.id
        const expense = await Expense.findByIdAndDelete(id)
        if(!expense) {
            return res.status(404).json({})
        }
        res.status(200).json(expense)
    }catch(err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong'})
    }
}

module.exports=expenseCltr
*/
const Expense = require("../models/expense-model");
const Category = require("../models/category-model");
const { validationResult } = require('express-validator');

const expenseCltr = {};

// List Expenses
expenseCltr.list = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Create Expense
expenseCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { expenseDate, amount, description, categoryId,person } = req.body;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).send({ msg: 'Invalid Category ID' });
        }

        const expense = new Expense({ expenseDate, amount, description, categoryId ,person});
        await expense.save();
        res.status(201).send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Single Expense
expenseCltr.single = async (req, res) => {
    try {
        const id = req.params.id;
        const expense = await Expense.findById(id);
        res.status(200).json(expense);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Update Expense
expenseCltr.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { expenseDate, amount, description, categoryId ,person} = req.body;

    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).send({ msg: 'Invalid Category ID' });
        }

        const expense = await Expense.findByIdAndUpdate(req.params.id, { expenseDate, amount, description, categoryId,person}, { new: true });
        res.send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Remove Expense
expenseCltr.remove = async (req, res) => {
    try {
        const id = req.params.id;
        const expense = await Expense.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({});
        }
        res.status(200).json(expense);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = expenseCltr;

