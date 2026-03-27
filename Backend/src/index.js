import "dotenv/config";
import app from "./app.js";
import { connectDb } from "./config/Database.js";
import { WebSocketServer } from "ws";
import http from "http";
import { set } from "mongoose";

const PORT=process.env.PORT || 8000;

const startServer=async()=>{
    try {
        await connectDb();

        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`);
            
        });
    } catch (error) {
        console.error("serverfailed to start : ",error);
        process.exit(1);
    }
}

const server=http.createServer(app);

const wss=new WebSocketServer({server});


const clients=new set();

wss.on("connection",(ws)=>{
    console.log("client connected");
    clients.add(ws);

    ws.on("message",(message)=>{
        
    })
})

startServer();
