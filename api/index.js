import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import {v4 as uuidv4} from "uuid"



dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();





app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


app.use((err, req, res, next) => {
  //middleware for handling errors
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const httpServer = createServer();
const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET","POST"],
  },
})


io.use((socket,next)=>{
  const username = socket.handshake.auth.username;
  if(!username){
    return next(new Error("Invalid username"))
  }

  socket.username=username;
  socket.userId = uuidv4();
  next();



})


io.on("connection",async(socket)=>{
  socket.emit("session",{userId: socket.userId , username: socket.username})
})

console.log("listening to port...");
httpServer.listen(process.env.PORT || 4000);
