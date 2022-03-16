const mongoose = require('mongoose');

const joinSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"This username has been already taken by someone"]
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"This email has already been registered"]
    },
    date:{
        type:Date,
        required:true
    }
});

const join = new mongoose.model("Join",joinSchema);
module.exports = join;