import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";  // Import from socket.js

dotenv.config({});

const PORT = process.env.PORT || 5000;

// CORS middleware for Express routes
app.use(cors({
    origin: [
        "https://chatifynest-1.onrender.com",
        "http://localhost:3000"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Other middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);

// Start server
server.listen(PORT, () => {
    connectDB();
    console.log(`Server listening on port ${PORT}`);
});