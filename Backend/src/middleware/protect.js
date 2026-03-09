import jwt from "jsonwebtoken";
import users from "../model/user.js"

export const protect=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"not authorized"});
        }

        const token= authHeader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

        const userExist=await users.findById(decoded.id).select("-password");

        if(!userExist){
            return res.status(401).json({message:"user no longer exist"});
        }

        req.user=userExist;
        next();
    }
    catch(error){
        return res.status(500).json({message:"server error"});

    }
};