const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs");
const { error } = require("console");

const app = express();


// middleware - plugin

app.use(express.urlencoded({extended: false}));
// browser html data

app.get("/users",(req,res)=>{
    const html = `
    <ul>
        ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    return res.send(html);
});
// api mobile 
app.get("/api/users",( req,res)=>{
    return res.json(users);
});
app
.route("/api/users/:id")
.get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id===id);
    if(!user) return res.status(404).json({error: "user not found"})
    return res.json(user);
})
.patch((req,res)=>{
    // edit user with user id
    return res.json({status:"pending"});
})
.delete((req,res)=>{
    // delete user with user id 
    return res.json({status:"pending"});
});

app.post("/api/users",(req,res)=>{
    // to create a new user
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email ||!body.gender ||!body.job_tittle){
        return res.status(400).json("reqiured all field to be inserted");
    }
    users.push({...body,id:users.length+1});

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status:"success",id:users.length});
    });

    
});

app.listen(8000,()=> console.log("project started"));