const express = require("express");
const {logReqRes} = require("./middleware")
const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user")

const port = 8000;
//connecting mongoDB
connectMongoDb('mongodb://127.0.0.1:27017/projectrest').then(()=> console.log("MongoDb Connected!"));
// Schema
const app = express();
// middleware - plugin
app.use(express.urlencoded({extended: false}));

app.use(logReqRes("log.txt"));

app.use("/api/users",userRouter);

app.listen(port,()=> console.log(`Server Started at PORT:${port}`));