import React, { useState, useEffect } from "react";
import { listenForMessages, sendMessage, listenForUserJoined, notifyUserJoined } from "../socket.js";

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState(null);
    const [isUsernameSet, setIsUsernameSet] = useState(false);
    const [onlineUser, setOnlineUser] = useState("");

    useEffect(() => {
        setUserId(Math.random().toString(36).substring(2, 15));
    }, []);

    useEffect(() => {
        const messageHandler = ({ id, text, senderName }) => {
            setMessages((prevMessages) => {
                const alreadyExists = prevMessages.some(
                    (msg) => msg.text === text && msg.id === id
                );
                return alreadyExists
                    ? prevMessages
                    : [...prevMessages, { id, text, senderName }];
            });
        };

        listenForMessages(messageHandler);

        // Listen for "User is online" event
        listenForUserJoined((newUser) => {
            setOnlineUser(newUser);

            // Remove the notification after 4 seconds
            setTimeout(() => setOnlineUser(""), 4000);
        });
    }, []);

    const handleSend = () => {
        if (messageInput.trim() !== "" && username.trim() !== "") {
            const messageData = {
                id: userId,
                text: messageInput,
                senderName: username,
            };

            setMessages((prevMessages) => [...prevMessages, messageData]);
            sendMessage(messageData);
            setMessageInput("");
        }
    };

    const handleSetUsername = () => {
        if (username.trim()) {
            setIsUsernameSet(true);
            notifyUserJoined(username); // Notify server that user joined
        }
    };

    return (
        <div>
            {!isUsernameSet ? (
                <div>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleSetUsername} disabled={!username.trim()}>
                        Set Name
                    </button>
                </div>
            ) : (
                <div>
                    <h3>Welcome, {username}!</h3>

                    {onlineUser && (
                        <div style={{ background: "lightgreen", padding: "5px", marginBottom: "10px" }}>
                            {onlineUser} is online!
                        </div>
                    )}

                    <div>
                        {messages.map((msg, index) => (
                            <p key={index} style={{ color: msg.id === userId ? "blue" : "green" }}>
                                {msg.senderName}: {msg.text}
                            </p>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            )}
        </div>
    );
};

export default MessageList;
