const express = require("express");
const hbs = require("hbs");
const path = require("path");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;
const app = express();

require("./db/conn");
const Message = require("./models/message")

let templatePath = path.join(__dirname,"/templates");
app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.static(templatePath));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

let myInfo = nodemailer.createTransport({
    service:"gmail",
    port:port,
    auth:{
        user:"hsjaiswal3110@gmail.com",
        pass:"Harsh.2003#"
    }
})

app.get("/",(req,res)=>{
    res.render("index")
});
app.get("/achievements",(req,res)=>{
    res.render("achievements")
});
app.get("/join",(req,res)=>{
    res.render("join");
})
app.post("/",async(req,res)=>{

    try{
        const d= new Date();
            const sendMessage = new Message({
                email : req.body.myemail,
                name: req.body.myname,
                msg : req.body.sendmsg,
                date : `${d.getTime()}`
            })
            let mailOptions={
                from:"hsjaiswal3110@gmail.com",
                to: req.body.myemail,
                subject:"Message from harsh jaiswal",
                text:`Hi ${req.body.myname}. Thank you for contacting Mr. Harsh Jaiswal. Your response have been submitted and soon you will get reply to your response in your mail id.`
            }
            myInfo.sendMail(mailOptions,function(err,info){
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send(info.response);
                }
            })
            const result = await sendMessage.save();
            res.status(201).render("index")
    }catch(err){
        res.status(400).send(err);
    }
})
app.get("*",(req,res)=>{
    res.render("error404")
})
app.listen(port,()=>{
    console.log("done at 5000")
})