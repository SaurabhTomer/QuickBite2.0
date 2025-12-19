import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


// db connection function
 export const connectDB = async (req , res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase Connected");
        
    } catch (error) {
        console.log("DataBase connection error");
    }
}