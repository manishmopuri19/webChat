import express from "express";
import authRouter from "./router/authRouter.js";

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routing

app.use("/api/auth",authRouter)

export default app;