import "dotenv/config";
import app from "./app.js";
import { connectDb } from "./config/Database.js";
import { Server } from "socket.io";
import http from "http";

const PORT=process.env.PORT || 8000;

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

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

io.on("connection", (socket) => {
    console.log("A soul has entered the realm:", socket.id);

    //joined a user 
    socket.on("join_self", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} is monitoring their own pulse.`);
    });

    //joined to shared chat
    socket.on("join_chat", (chatId) => {
        socket.join(chatId);
        console.log(`Socket ${socket.id} joined room: ${chatId}`);
    });

    //emit the message to a user
    socket.on("send_message", (data) => {
        const { chatId, senderId, receiverId, text } = data;

        // Broadcast to everyone in the room (including the sender's other tabs)
        io.to(chatId).emit("receive_message", {
            chatId,
            senderId,
            text,
            createdAt: new Date()
        });
    });

    socket.on("disconnect", () => {
        console.log("A soul has departed.");
    });
});


startServer();
