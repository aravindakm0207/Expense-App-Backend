const Category=require("../models/category-model")
const categoryValidationSchema={
    name:{
        in:['body'],
        notEmpty:{
            errorMessage:'Name cannot be empty'
        },
        custom:{
            options:function(value){
                return Category.findOne({name:value})
                       .then((obj)=>{
                           if(!obj){
                              return true
                           }
                           throw new Error('category name already taken')
                       })
            }
        }
    }
}
module.exports=categoryValidationSchema