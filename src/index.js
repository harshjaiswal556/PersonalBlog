const express = require("express");
const hbs = require("hbs");
const path = require("path");
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
app.get("/",(req,res)=>{
    res.render("index")
});
app.post("/",async(req,res)=>{

    try{
            const sendMessage = new Message({
                email : req.body.myemail,
                name: req.body.myname,
                msg : req.body.sendmsg
            })
            const result = await sendMessage.save();
            res.status(201).render("index")
    }catch(err){
        res.status(400).send(err);
        console.log(req.body.Email)
    }
})
app.get("*",(req,res)=>{
    res.render("error404")
})
app.listen(port,()=>{
    console.log("done at 5000")
})