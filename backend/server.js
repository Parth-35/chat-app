const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Allow cross-origin requests
app.use(cors());

const io = require("socket.io")(server, {
  cors: {
    origin: "https://chat-app-chi-self-51.vercel.app",
    methods: ["GET", "POST"]
  },
  path: "/socket.io"  // Explicitly set the path
});
 

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("userJoined", (username) => {
        console.log(`${username} has joined the chat`);

        // Broadcast the event to all users except the sender
        socket.broadcast.emit("userJoined", username);
    });

    socket.on("chatMessage", ({ text, senderName }) => {
        console.log(`Received message from ${senderName}:`, text);

        // Send message to everyone except the sender
        socket.broadcast.emit("chatMessage", {
            id: socket.id,
            text,
            senderName,
        });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});



// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
