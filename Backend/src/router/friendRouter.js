import express from "express"
import getFriends from "../controller/friendsController.js"
import protect from "../middleware/protect.js";
const router=express.Router();

router.get("/getFriends",protect,getFriends);

export default router;