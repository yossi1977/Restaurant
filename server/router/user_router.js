const router = require("express").Router()
const User = require("../model/user_model")
const { hash, compare } = require("bcrypt");

router.post("/" , async(req,res)=>{
    try {
        
        const {user_name , user_password , user_email  } = req.body
        console.log(user_name , user_password , user_email )
        // if the enter all the input
        if (!user_name || !user_password || !user_email){
            throw new Error("you need to insert all credential to inputs");   
        } 
         
        const hashPassword = await hash(user_password,10)
        //if we get promise
        if (!hashPassword){
            throw new Error("try again"); 
        }
        
        
        const new_user = new User({
            user_name,
            user_password:hashPassword,
            user_email
        });

        await new_user.save()

        res.status(200).json({message:"you success to get"})
    } catch (error) {
        
        res.status(500).json({
            message:"you not success to get",
            error: error.message})
    }
})



module.exports = router