import express from "express";
import chatHistory from "../controller/messageController.js";
import protect from "../middleware/protect.js";
const router=express.Router();

router.get("/getFriendsChatHistory",protect,chatHistory);

export default router;