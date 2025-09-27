// src/utils/socket.js
import { io } from "socket.io-client";
import { BASE_URL } from "..";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io(BASE_URL, {
      query: { userId },
      withCredentials: true,
    });

    console.log("🔌 Socket connected:", socket.id);

    socket.on("connect", () => {
      console.log("✅ Socket connected successfully:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket disconnected manually");
  }
};
