const mongoose = require("mongoose")
const messageSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true
    },
    name : {
        type:String,
        required:true
    },
    msg : {
        type:String,
        required:true
    }
})

const Message = new mongoose.model("Message",messageSchema);

module.exports=Message;