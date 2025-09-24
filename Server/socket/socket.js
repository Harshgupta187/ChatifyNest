// socket.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// CORS setup to allow your frontend
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"], // your frontend URL
    methods: ["GET", "POST"],
  },
});

// Map to store userId -> socketId
const userSocketMap = {};

// Helper function to get socketId by userId
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Listen for connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Get userId from handshake query
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit the list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (userId) delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`);
});

// Export app and io if needed elsewhere
export { app, io, server };
