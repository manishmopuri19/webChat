import { Chat } from "../model/chat.js";
import { message } from "../model/message.js";

export const chatHistory=async(req,res)=>{
try {
    const myId=req.user._id
    const {friendId}=req.body

    if(!friendId) return res.status(404).json({message:"friend id required"});

    let chat=await Chat.findOne({
        participants:{ $all:[myId,friendId]}
    });

    if(!chat){
        await Chat.create({
            participants:[myId,friendId]
        });
        return res.status(200).json({ chatId: chat._id, messages: [] });
    }

    const messages=await message.find({chatId:chat._id}).sort({createdAt: 1}).select("text sender receiver createdAt");
    
    res.status(200).json({chatId: chat._id,
            messages: messages});
    } catch (error) {
        
        res.status(500).json(error);
    }
}
