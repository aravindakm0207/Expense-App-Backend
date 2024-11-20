const mongoose=require("mongoose")
const {Schema,model}=mongoose
const expenseSchema=new Schema({
    expenseDate:Date,
    amount:Number,
    description:String,
    person:String,
    categoryId: { type: Schema.Types.ObjectId, 
    ref: 'Category'}

},{timestamps:true})

const Expense=model('Expense',expenseSchema)
module.exports=Expense