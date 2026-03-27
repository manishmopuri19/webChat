import { message, message } from "../model/message";
import { users } from "../model/user";

export const getFriends=async(req,res)=>{
    
    try {
        const user=await users.findById(req.user_id).populate("friends","userName mobile email _id");

        if(!user){
            return res.status(404).json({message:"friends not found"});
        }
        return res.status(200).json(user.friends);
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

