const express = require("express");
// const hbs = require("hbs");
const hbs = require('nodemailer-express-handlebars')
const path = require("path");
const nodemailer = require("nodemailer");
const port = process.env.PORT || 5000;
const app = express();

require("./db/conn");
const Message = require("./models/message")
const Join = require("./models/join");

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

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve(templatePath),
        defaultLayout: false,
    },
    viewPath: path.resolve(templatePath),
};

myInfo.use('compile',hbs(handlebarOptions))

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
                template: 'email',
                context:{
                    name:req.body.myname
                }
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

app.post("/join",async(req,res)=>{
    try{
        const password = req.body.mypassword;
        const confirmPassword = req.body.myconfirmpassword;
        const username = req.body.myusername;
        const User = await Join.findOne({username:username});
        if(password === confirmPassword){
            const d = new Date();
            const register = new Join({
                username : req.body.myusername,
                password : req.body.mypassword,
                confirmPassword : req.body.myconfirmpassword,
                email : req.body.myemail,
                date : `${d.getTime()}`
            })
            if(User==null){
                const result = register.save();
                res.status(201).render("courses")
            }
            else{
                res.send("This username has been already taken")
            }
        }
        else{
            res.send("Password not matched")
        }
    }catch(err){
        res.status(400).send(err);
    }
})

app.post("/login",async(req,res)=>{
    try{
        const username = req.body.myUsername;
        const password = req.body.myPassword;
        const user = await Join.findOne({username:username})
        if(!user){
            res.send("Invalid Login Details");
        }
        else if(password===user.password){
            res.render("courses")
        }
        else{
            res.send("Invalid login details")
        }
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