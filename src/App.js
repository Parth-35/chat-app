import React from "react";
import MessageList from "./components/MessageList";
import ChatBox from "./components/ChatBox";

const App = () => {
    return (
        <div>
            <h1>Chat App</h1>
            <MessageList />
            <ChatBox />
        </div>
    );
};

export default App;
