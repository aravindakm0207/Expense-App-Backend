const Expense=require("../models/expense-model")
const expensevalidationSchema={
    expenseDate:{
        in:['body'],
        exists:{
            errorMessage:'expense date is required'
        },
        notEmpty:{
            errorMessage:'expense date cannot be empty'
        },
        isDate:{
            errorMessage:'expense date is not valid'
        },
        custom:{
            options:function(value){
                if(new Date(value)>new Date()){
                    throw new Error('expense date cannot be greater then today')
                }
                return true
            }
        }
    },
    amount:{
        in:['body'],
        exists:{
            errorMessage:'amount is required'
        },
        notEmpty:{
            errorMessage:'amount cannot be empty'
        },
        isNumeric:{
            errorMessage:'amount should be a number'
        },
        custom:{
            options:function(value){
                if (value<1){
                    throw new Error('expense must be greater than 1')
                }
                return true
            }
        }
    }
}
module.exports=expensevalidationSchema