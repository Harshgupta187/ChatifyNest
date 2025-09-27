import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:[
            'https://chatifynest-1.onrender.com',  // Your production frontend URL
            'http://localhost:3000'                // For local development
        ],
        methods:['GET', 'POST'],
        credentials: true
    },
});

const userSocketMap = {}; // {userId->socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

io.on('connection', (socket)=>{
    console.log('User connected:', socket.id);
    
    const userId = socket.handshake.query.userId
    if(userId !== "undefined" && userId){
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} mapped to socket ${socket.id}`);
    } 

    // Emit online users to all connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', ()=>{
        console.log('User disconnected:', socket.id);
        if(userId){
            delete userSocketMap[userId];
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })

})

export {app, io, server};