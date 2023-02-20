
const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,'shhhhh',function(err,decoded){
            console.log(decoded);
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send({"msg":"please login"})
            }
        })
    }else{
        res.send({"msg":"something went wrong"})
    }
}

module.exports={
    authenticate
}