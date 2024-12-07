const express = require("express");
// const users = require("./MOCK_DATA.json")

const mongoose = require("mongoose");



//connecting mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/projectrest')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log('Mongo Error'));
// Schema
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:true,
    },
    lastname:{
        type: String,
        
    },
    email:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,

    },jobTittle:{
        type:String,

    }
    
},{timestamps:true})

const User = mongoose.model("user",userSchema);
const fs = require("fs");
// const { error } = require("console");
// const { type } = require("os");

const app = express();


// middleware - plugin

app.use(express.urlencoded({extended: false}));
// browser html data

app.get("/users",async(req,res)=>{
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map(user=>`<li>${user.firstname}  - ${user.email}</li>`).join("")}
    </ul>
    `
    return res.send(html);
});
// api mobile 
app.get("/api/users",async( req,res)=>{
    const allDbUsers = await User.find({});
// always use X to custum header
    res.setHeader("X-myName","Shubham Patel");

    return res.json(allDbUsers);
});
app
.route("/api/users/:id")
.get(async(req,res)=>{
    // const id = Number(req.params.id);
    // const user = users.find((user)=> user.id===id);
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "user not found"})
    return res.json(user);
})
.patch(async(req,res)=>{
    // edit user with user id
    await User.findByIdAndUpdate(req.params.id,{lastname:"changed"})
    return res.json({status:"sucsess"});
})
.delete(async(req,res)=>{
    // delete user with user id 
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"});
});

app.post("/api/users",async(req,res)=>{
    // to create a new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email ||!body.gender ||!body.job_tittle){
        return res.status(400).json("reqiured all field to be inserted");
    }


    const result=await User.create({
        firstname:body.first_name,
        lastname:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTittle:body.job_tittle,
    });

    // console.log('result',result);
    return res.status(201).json({msg:"success"})
    // users.push({...body,id:users.length+1});

    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    //     return res.status(201).json({status:"success",id:users.length});
    });
    

    


app.listen(8000,()=> console.log("project started"));