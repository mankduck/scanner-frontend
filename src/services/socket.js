import { io } from "socket.io-client";

const SOCKET_URL = "https://luubut-backend.onrender.com";

export const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});