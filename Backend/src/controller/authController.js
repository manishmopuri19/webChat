import { users } from "../model/user";
import generateToken from "../util/generateToken";
import bcrypt from "bcrypt";

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password) return res.status(401).json({message:"missing feilds"});

        const user=await users.findOne({email}).select("+password");

        if(!user){
            return res.status(401).json({message:"user not found"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({message:"invalid credentials"});
        

        const token=generateToken(user);
        return res.status(200).json({token,user:{
            id:user._id,
            name:user.userName,
            email:user.email
        }});
    } catch (error) {
        return res.status(500).json({message:"server issue"});
    }
}

export const registration=async(req,res)=>{
    const {
        userName,email,mobile,password
    }=req.body;

    const inviteToken = req.query.ref;
try {
    if(!userName || ! email || !mobile || !password){
        return res.status(401).json({message:"missing feilds"});
    }
    const userExist=await users.findOne({email});
    if(userExist){
        return res.status(401).json({message:"user already exist"});
    }

    const hashPassword=await bcrypt.hash(password,10);

    const user=await users.create({userName,email,mobile,hashPassword});

    if(!user)return res.status(500).json({message:"internal server error"});

    if(inviteToken){
        await users.findByIdAndUpdate(inviteToken,{
            $push:{friends:user._id}
        });
        await users.findByIdAndUpdate(user._id,{
            $push:{friends:inviteToken}
        });
    }

    return res.status(201).json({message:"user created successfully"})
    
        
    } catch (error) {
        return res.status(500).json({message:"server error"});
    }
}