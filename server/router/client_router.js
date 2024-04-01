const  router = require("express").Router()
const Client = require("../model/client_model")


router.get("/",async(req,res)=>{
    try {
        const clients = await Client.find()
        // console.log(client)
        res.status(200).json({message:"you success get",clients})
    } catch (error) {
       res.status(500).json({message:" you not success get",error}) 
    }
})

router.post("/",async(req,res)=>{
    try {
        const new_client = new Client(req.body)
        const client = await new_client.save()
        res.status(200).json({message:"you successfully add  client"})
    } catch (error) {
       res.status(500).json({message:" you not success add client",error}) 
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const id = req.params.id
        await Client.findByIdAndDelete(id)
        res.status(200).json({message:"delete client successfully"});

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"not success to delete client",error})
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const id = req.params.id
        await Client.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"update client successfully"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"not success to update client ",error})
    }
})

module.exports = router