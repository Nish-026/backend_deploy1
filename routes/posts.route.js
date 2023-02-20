const express=require("express");

const postRouter=express.Router()
const{postModel}=require("../model/posts.model")

postRouter.get("/",async(req,res)=>{
    try{
        const user=req.body.userID;
        console.log(user)
        const posts= await postModel.find(user);
        res.send(posts);
    }catch(err){
        res.send(err)
    }
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    console.log(payload);
    const post= new postModel(payload);
    await post.save();
    res.send({"msg":"note created"})
})

postRouter.patch("/update/:id",async(req,res)=>{
    const postID=req.params.id
    const payload=req.body;
    const post=await postModel.findOne({"_id":postID})
    const user_in_doc=post.user;
    const user_req=req.body.userID;
    try{
        if(user_in_doc!==user_req){
            res.send({"msg":"you are not authorized"})
        }else{
            await postModel.findByIdAndUpdate({"_id":postID},payload)
            res.send({"msg":"note updated"})
        }
    }catch(err){
        console.log(err);
        res.send({"msg":"something went wrong"})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const postID=req.params.id
    const post=await postModel.findOne({"_id":postID})
    const user_in_doc=post.user;
    const user_req=req.body.userID;
    try{
        if(user_in_doc!==user_req){
            res.send({"msg":"you are not authorized"})
        }else{
            await postModel.findByIdAndDelete({"_id":postID})
            res.send({"msg":"note deleted"})
        }
    }catch(err){
        console.log(err);
        res.send({"msg":"something went wrong"})
    }
})

module.exports={
    postRouter
}