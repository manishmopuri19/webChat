import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },

    type:{
        type:String,
        enum:["message","friend_request","call"]
    },

    content:{
        type:String
    },

    isRead:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

export const notification = mongoose.model("Notification",notificationSchema);