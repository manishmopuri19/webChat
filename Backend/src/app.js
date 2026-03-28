import express from "express";
import authRouter from "./router/authRouter.js";
import friendRouter from "./router/friendRouter.js";
import messageRouter from "./router/messageRouter.js";
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("api/auth",authRouter);
app.use("api/friends",friendRouter);
app.use("api/friends/messageHistory",messageRouter)



export default app;