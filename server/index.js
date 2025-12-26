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
import http from 'http'
import { Server } from 'socket.io';
import { socketHandler } from './socket.js';


const port = process.env.PORT || 5000 
const app = express();

const server = http.createServer(app)

const io = new Server( server , {
    cors : {
    origin:"http://localhost:5173",
    credentials:true,
    methods:['POST' , 'GET']
}
})

app.set( "io" , io)


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


socketHandler(io)
// server listen on this
server.listen( port , ()=>{
    connectDB();
    console.log(`Server started at ${port}`);
})