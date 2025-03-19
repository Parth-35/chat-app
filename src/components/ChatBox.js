import React, { useState } from "react";
import { sendMessage } from "../socket";

const ChatBox = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(message); // Send message to server
            setMessage(""); // Clear input after sending
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default ChatBox;
