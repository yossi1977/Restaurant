const router = require("express").Router()
const Dishes = require("../model/dishes_model")



router.get("/",async(req,res)=>{
    try {
        const dishes = await Dishes.find()
        // console.log(dishes)
        res.status(200).json({message:"dishes collection",dishes})
    } catch (error) {
        res.status(500).json({message:"not success get dishes",error})
    }
})

router.post("/",async(req,res)=>{
    try {
        const new_dishes = new Dishes(req.body)
        await new_dishes.save()
        res.status(200).json({message:"your dishes add successfully"})
    } catch (error) {
        res.status(500).json({message:"you not success to add item", error})
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const id =req.params.id
        await Dishes.findByIdAndDelete(id)
        res.status(200).json({message:"Delete successfully"})
    } catch (error) {
        res.status(500).json({message:"not success to delete item",error})
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const id = req.params.id
        await Dishes.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"update successfully"})
    } catch (error) {
        res.status(500).json({message:"not success to update item",error})
    }
})

module.exports= router 