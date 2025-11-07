// src/utils/socketClient.ts
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_API_URL || "http://localhost:5000", {
  transports: ["websocket"],
});

export default socket;
