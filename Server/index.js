// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
    origin: [
        "https://chatifynest-1.onrender.com",  // Your frontend URL
        "http://localhost:3000"                // For local development
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Your socket.io configuration should also include CORS
const io = new Server(server, {
    cors: {
        origin: [
            "https://chatifynest-1.onrender.com",  // Your frontend URL
            "http://localhost:3000"
        ],
        credentials: true
    }
});


// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});
