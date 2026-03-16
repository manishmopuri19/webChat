import "dotenv/config";
import app from "./app.js";
import { connectDb } from "./config/Database.js";

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



startServer();