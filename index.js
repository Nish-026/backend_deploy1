const express=require("express");
const {connection}=require("./db");
const {userRouter}=require("./routes/user.route")
const {postRouter}=require("./routes/posts.route")
const {authenticate}=require("./middleware/authenticate.middleware");
const cors=require("cors");
require("dotenv").config();
const app=express();
app.use(express.json());
app.use(cors())

app.use("/users",userRouter)
app.use(authenticate);
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{

    try{
        await connection
        console.log("connected to db")
    }catch(err){
        console.log(err)
    }
    console.log("server is running")
})