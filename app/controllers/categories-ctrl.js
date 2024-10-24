const Category=require("../models/category-model")
const {validationResult}=require('express-validator')
const categoryCltr={}

categoryCltr.list=async(req,res)=>{
    try { 
        const categories = await Category.find() 
        res.json(categories)
    } catch(err) {  
        console.log(err) 
        res.status(500).json({ error: 'something went wrong'})
    }
}


categoryCltr.create = async (req, res) => {
    const errors = validationResult(req) 
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    const body = req.body 
    const category = new Category(body)  
    await category.save()
    res.status(201).json(category)
}


categoryCltr.single = async (req, res) => {
    try{
        const id = req.params.id
        const category = await Category.findById(id)
        res.status(200).json(category)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong'})
    }
}




categoryCltr.update = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const id = req.params.id
        const body = req.body
        const category = await Category.findByIdAndUpdate(id,body,{new:true})
        if(!category){
            return res.status(404).json({})
        }
        res.status(200).json(category)
    }catch(err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong'})
    }
}

categoryCltr.remove = async (req, res) => {
    try{
        const id = req.params.id
        const category = await Category.findByIdAndDelete(id)
        if(!category) {
            return res.status(404).json({})
        }
        res.status(200).json(category)
    }catch(err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong'})
    }
}


module.exports=categoryCltr

