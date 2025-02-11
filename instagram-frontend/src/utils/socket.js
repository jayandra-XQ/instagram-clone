import { io } from "socket.io-client";

const socket = io("http://localhost:5002", {
  transports: ["websocket", "polling"], //ensure web socket works
});

export default socket;
