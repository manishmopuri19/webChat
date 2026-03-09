import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message"
    }

},{timestamps:true});

export const chat = mongoose.model("Chat",chatSchema);