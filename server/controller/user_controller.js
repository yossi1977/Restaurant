const User = require("../model/user_model")
const { hash , compare } = require("bcrypt");
const jwt = require("jsonwebtoken")




module.exports = { 
    userRegister: async (req,res)=>{
    try {

     const {user_name, user_password, user_email} = req.body

     if( !user_name || !user_password || !user_email){
        throw new Error("you need to insert all credential to inputs");

     }

     const hashPassword = await hash(user_password,10)
      
     if (!hashPassword) throw new Error("try again");
    
       const user = req.body
       console.log(user)
       user.user_password = hashPassword

       const newUser = new User (req.body)
       await newUser.save()

    //    user.user_password = "******"
       
       res.status(200).json({message:"you successfully add user "})
    } catch (error) {
        res.status(500).json({
            message: "you not success to add user",
            error:error.message

        })

    }
},

userLogin:async (req,res)=>{
    try {
        const { user_password, user_email} = req.body
        if (!user_password || !user_email) throw new Error ("you need to insert all credential to log in")
        //if the email inside the db he will  return all the object if not it return none
        const user = await User.findOne({user_email})
        // check if the user pass word in the db
        if (!user) throw new Error("email is not valid")
        const ifPassword = await compare(user_password,user.user_password)
        if(!ifPassword) throw new Error("password is not valid")

        //if authentication was true we create token for the user
        // const token = jwt.sign(payload, secretKey, options);
        console.log(user)
        const token = jwt.sign({userID:user._id},process.env.JWG_SECRET,{expiresIn:"3h"})
        // we need to insert the token to db
        await User.findByIdAndUpdate(user._id,{token:token})
        // add the token to local storage
        // res.json({token})
        res.status(200).json({
            message:"you successfully login ",
            success:true,
            token
    }

        )
    } catch (error) {
        res.status(500).json({
            message: "you not success to log in",
            error:error.message,
            

        })
    }
}
}
