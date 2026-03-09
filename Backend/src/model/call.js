import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
    caller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    callType:{
        type:String,
        enum:["audio","video"]
    },
    status:{
        type:String,
        enum:["missed","completed","rejected"]
    },
    duration:{
        type:Number
    }

},{timestamps:true});

export const call = mongoose.model("Call",callSchema);