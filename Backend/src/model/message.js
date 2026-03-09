import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat",
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    text:{
        type:String
    },
    messageType:{
        type:String,
        enum:["text","image","video","file"],
        default:"text"
    },
    status:{
        type:String,
        enum:["sent","delivered","seen"],
        default:"sent"
    }

},{timestamps:true});

export const message = mongoose.model("Message",messageSchema);