const router = require("express").Router()
const User = require("../model/user_model")
const { hash , compare } = require("bcrypt");


module.exports={
    userRegister: async(req,res)=>{
    try {
        const {user_name , user_password , user_email  } = req.body
        console.log(user_name , user_password , user_email )
        // if user enter all the input
        if (!user_name || !user_password || !user_email){
            throw new Error("you need to insert all credential to inputs");   
        } 
        // encoding the password before we enter it to db
        const hashPassword = await hash(user_password,10)

        //if we not get promise
        if (!hashPassword){
            throw new Error("try again"); 
        }
        
        const new_user = new User({
            user_name,
            user_password:hashPassword,
            user_email
        });

        await new_user.save()

        res.status(200).json({message:"you success to add"})
    } catch (error) {
        
        res.status(500).json({
            message:"you not success to get",
            error: error.message})
    }
}

}

