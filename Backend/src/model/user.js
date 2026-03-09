import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    mobile:String,
    password:{
        type:String,
        required:true
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    chats:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat"
    }]
},
{timestamps:true}
);

export const users=mongoose.model("users",userSchema);