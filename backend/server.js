// package imports
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";

// route imports
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// database import
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js"; 21

// config
dotenv.config();
// variables
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

// automatically parse incoming requests, adds middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
app.use(
    "/",
    createProxyMiddleware({
        target: "http://localhost:3001", // URL of your React development server
        changeOrigin: true,
    })
);



app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
}); 