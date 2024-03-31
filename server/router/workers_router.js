const router = require("express").Router()
const Workers = require("../model/workers_model")



router.get("/",async(req,res)=>{
    try {
        const workers= await Workers.find()
        res.status(200).json({message:"you success get worker",workers})
        
    } catch (error) {
        res.status(500).json({message:"not success to get worker",error})
    }
})

router.post("/",async(req,res)=>{
    try {
        const new_worker = new Workers(req.body)
        await new_worker.save()
        res.status(200).json({message:"you successfully add worker"})
        
    } catch (error) {
        res.status(500).json({message:"not success to add worker",error})
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const id = req.params.id
        await Workers.findByIdAndDelete(id)
        res.status(200).json({message:"you success delete worker"})
        
    } catch (error) {
        res.status(500).json({message:"not success to delete worker",error})
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const id =  req.params.id
         await Workers.findByIdAndUpdate(id,req.body)
         res.status(200).json({message:"you success update worker"})
        
    } catch (error) {
        res.status(500).json({message:"not success to update worker",error})
    }
})

module.exports = router
