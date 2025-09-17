import {Server} from "socket.io";
import http from "http"
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors:{
    origin:['http://localhost:3000'],
    methods:['GET', 'POST'],

  }
});
export const getReceiverSocketId= (receiverId) =>{
  return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId -> socketId}

io.on('connection' , (soc) =>{
  console.log('user connected' , soc.id);

  const userId = soc.handshake.query.userId;

  if(userId !== undefined){
    userSocketMap[userId] = soc.id
  }
  
  io.emit('getOnlineUsers',Object.keys(userSocketMap));


  soc.on('disconnect' , () => {
    console.log('user disconnected', soc.id);
    delete userSocketMap[userId];

    io.emit('getOnlineUsers' , Object.keys(userSocketMap));
  })

})



export {app , io , server}