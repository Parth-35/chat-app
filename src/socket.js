import { io } from "socket.io-client";

const socket = io("https://chat-app-backend-2-9a80100425f2.herokuapp.com");

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
