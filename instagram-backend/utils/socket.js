import socketIO from 'socket.io'

let io;

export const initializeSocket = (server) => {
  io = socketIO(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
}

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};

