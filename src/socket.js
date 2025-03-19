import { io } from "socket.io-client";

const socket = io("wss://chat-app-chi-self-51.vercel.app/socket.io");  // Explicitly set the path


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
