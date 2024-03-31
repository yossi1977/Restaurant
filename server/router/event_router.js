const router = require("express").Router()
const Event = require("../model/event_model")

router.get("/",async(req,res)=>{
    try {
        const events = await Event.find()
        res.status(200).json({message:"you success to get",events})
    } catch (error) {
        res.status(500).json({message:"you not success to get",error})
    }
})

router.post("/",async(req,res)=>{
    try {
       const events = new Event (req.body)
       await events.save()
       res.status(200).json({message:"you successfully add event "})
    } catch (error) {
        res.status(500).json({message: "you not success to add item",error})
    }
})

router.delete("/:id", async(req,res)=>{
    try {
        const id = req.params.id
        await Event.findByIdAndDelete(id)
        res.status(200).json({message:"you success to delete"})
    } catch (error) {
        res.status(500).json({message:"you not success delate event",error})
    }
})

router.put("/:id", async(req,res)=>{
    try {
        const id = req.params.id
        await Event.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"you success to update"})
    } catch (error) {
        res.status(500).json({message:"you not success update",error})
    }
})


module.exports = router

