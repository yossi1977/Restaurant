
const mongoose = require("mongoose")

const workers_schema = new mongoose.Schema({
// worker_firstName worker_lastName   worker_title  worker_phone worker_salary
  // firstName lastName title phone salary
    worker_firstName : {
        type:String,
        required : true,
    },
    worker_lastName:{
        type:String,
        required : true,
    },
    worker_phone :{
        type:String,
        required : true,
    },
    worker_title:{
        type:String,
        required : true,
    },
    worker_salary:{
        type:Number,
        required : true,
    }

})

module.exports = mongoose.model("workers",workers_schema)