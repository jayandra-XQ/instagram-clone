import 'dotenv/config'
import express from "express";
import cors from "cors";
import http from "http";
import connectDB from './config/db.js';
import postRoutes from "./routes/postRoutes.js";
import { initializeSocket, getIO } from './utils/socket.js';

const app = express();
const server = http.createServer(app);


// Initialize Socket.io
initializeSocket(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/posts", postRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
