const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;

let myInfo = nodemailer.createTransport({
    service:"gmail",
    port:port,
    auth:{
        user:"hsjaiswal3110@gmail.com",
        pass:"Harsh.2003#"
    }
})

module.exports = myInfo