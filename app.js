const express=require("express");
const ejs=require("ejs");
const bodyParser=require("body-parser");
const app=new express();
const mongoose=require("mongoose");
const cookieparser=require("cookie-parser");
app.use(express.static("public"));
app.set("view engine","ejs");
mongoose.set('strictQuery', true);
app.use(bodyParser.urlencoded({
    extended: true
}));
//connecting to mongodbatlas
mongoose.connect("mongodb+srv://admin-jafer:test123@cluster0.xa98cq6.mongodb.net/flexmoney");
//creating a schema
const userschema={
    firstname: String,
    middlename: String,
    lastname: String,
    gender: String,
    dob: String,
    age: Number,
    email: String,
    phone: String,
    startmonth: String,
    batch: String 
    };
const user=mongoose.model("user",userschema);
//storing the information
app.post("/submit",function(req,res){
    const client=new user({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname:req.body.lastname,
        gender: req.body.gender,
        dob: req.body.dob,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.contactno,
        startmonth: req.body.start,
        batch: req.body.batch 
    });
    client.save();
    res.render("thank",{user: client});
})
app.get("/",function(req,res){
    res.render("main");
})
//completepayment implementation
app.get("/completpayment",function(req,res){
    const result="";
    res.render("paymentstatus",{status: result});
})
app.listen("3000" || process.env.PORT,function(){
    console.log("server started");
});