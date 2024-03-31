const mongoose = require("mongoose")



const event_schema = mongoose.Schema({
    event_date:{
        type:String,
        require:true,
    },
    event_time:{
        type:String,
        require:true,
    },
    
    number_of_ppl:{
        type:Number,
        require:true
    },
    order_price:{
            type:Number,
            require:true
    },
    clientName: {
        type: String,
        required: true
    },
    clientContact: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model("events",event_schema)