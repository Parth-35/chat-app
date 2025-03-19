import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust for your server URL

export const listenForMessages = (callback) => {
    socket.on("chatMessage", callback);
};

export const sendMessage = (message) => {
    socket.emit("chatMessage", message);
};

// ✅ Ensure these functions are correctly added
export const listenForUserJoined = (callback) => {
    socket.on("userJoined", callback);
};

export const notifyUserJoined = (username) => {
    socket.emit("userJoined", username);
};

export default socket;
