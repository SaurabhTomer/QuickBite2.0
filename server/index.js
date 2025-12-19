import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';


const port = process.env.PORT || 5000 
const app = express();

//parsing 
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser())


//auth routes
app.use("/api/auth" , authRouter)
//user routes
app.use("/api/user" , userRouter)



// server listen on this
app.listen( port , ()=>{
    connectDB();
    console.log(`Server started at ${port}`);
})