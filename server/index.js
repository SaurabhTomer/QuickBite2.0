import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import shopRouter from './routes/shop.routes.js';
import itemRouter from './routes/item.routes.js';


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
//shop routes
app.use("/api/shop" , shopRouter)
//item routes
app.use("/api/item" , itemRouter)



// server listen on this
app.listen( port , ()=>{
    connectDB();
    console.log(`Server started at ${port}`);
})