import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/connectDB.js';
dotenv.config()


const port = process.env.PORT || 5000 
const app = express();



// server listen on this
app.listen( port , ()=>{
    connectDB();
    console.log(`Server started at ${port}`);
})