const mongoose = require("mongoose")
// client_firstName client_lastName client_phone client_email 
const  client_scheme = new mongoose.Schema({
    client_firstName:{
        type: String,
        required: true
    },
    client_lastName:{
        type: String,
        required: true
    },
    client_phone:{
        type: String,
        required: true
    },
    client_email:{
        type: String,
        required: false
    }

})

module.exports = mongoose.model("client",client_scheme)
