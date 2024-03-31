//dishes
//import mongoose 
// make new class 

 const mongoose = require("mongoose")
// name description price
// dishes_name dishes_description dishes_price

 const dishes_scheme = new mongoose.Schema({
    dishes_name:{
        type:String,
        required : true
    },
    dishes_description:{
        type:String,
        required :true
    },
    dishes_price:{
        type:Number,
        required:true
    }
 })

module.exports = mongoose.model("dishes",dishes_scheme)
