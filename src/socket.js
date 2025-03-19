import { io } from "socket.io-client";

<<<<<<< HEAD
const socket = io("https://chat-app-backend-2-9a80100425f2.herokuapp.com");
=======
const socket = io("wss://chat-app-chi-self-51.vercel.app/socket.io");  // Explicitly set the path
>>>>>>> 2f07e375f26c6dfa536be3027a1ac4b7f390fa76


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
