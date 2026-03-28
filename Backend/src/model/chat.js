import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
    participants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users",
        required: true 
    }],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }
}, { timestamps: true });

chatSchema.index({ participants: 1 }); 

export const Chat = mongoose.model("Chat", chatSchema);