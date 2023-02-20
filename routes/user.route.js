const express=require("express");
const bcrypt=require("bcrypt");

const userRouter= express.Router();

const {userModel}= require("../model/user.model")

const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
    const{name,email,gender,password,age,city}=req.body
    try{
        const user= await userModel.find({email})
        if(user.length>0){
            res.send({"msg":"user already registered"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err)res.send(err.message)
                else{
                    const user=new userModel({name,email,gender,password:hash,age,city})
                    await user.save();
                    res.send({"msg":"NEW USER REGISTERED"})
                }
            })
        }

    }catch(err){
        res.send({"msg":"something went wrong","error":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=(req.body)
    try{
        const user= await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},'shhhhh')
                    res.send({"msg":"Logged in","token":token})
                }else{
                    res.send({"msg":"something went wrong"})
                }
            })
        }else{
            res.send({"msg":"wrong credentials"})
        }
    }catch(err){
            res.send({"msg":"something went wrong","error":err.message})
        }
})

module.exports={
    userRouter
}