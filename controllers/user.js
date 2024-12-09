const User= require("../models/user");
async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({});
// always use X to custum header
    res.setHeader("X-myName","Shubham Patel");

    return res.json(allDbUsers);
}
async function handleGetUserById(req,res){
    // const id = Number(req.params.id);
    // const user = users.find((user)=> user.id===id);
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "user not found"})
    return res.json(user);
}
async function handleUpdateUserById(req,res){
    // edit user with user id
    await User.findByIdAndUpdate(req.params.id,{lastname:"changed"})
    return res.json({status:"sucsess"});
}
async function handleDeleteUserById(req,res){
    // delete user with user id 
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"});
}

async function handleCreateNewUser(req,res){
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
    return res.status(201).json({msg:"success", id:result._id})
    // users.push({...body,id:users.length+1});

    // fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    //     return res.status(201).json({status:"success",id:users.length});
};


module.exports = {
    handleGetAllUsers,handleGetUserById,
    handleUpdateUserById,handleDeleteUserById,handleCreateNewUser,
};