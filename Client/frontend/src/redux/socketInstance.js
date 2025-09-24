// socketInstance.js
import { io } from "socket.io-client";

let socket = null;

export const initSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:5000", { query: { userId } });
  }
  return socket;
};

export const getSocket = () => socket;

export const closeSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
