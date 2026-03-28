import mongoose from "mongoose";

export const connectDb=async ()=>{

    try {
        const connectionInstance=await mongoose.connect(process.env.MONGODB_URL);

        console.log(`mongoDB connected succesufully at instance ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.error("MongoDb connection failed:",error.message);
        process.exit(1);
    }
}