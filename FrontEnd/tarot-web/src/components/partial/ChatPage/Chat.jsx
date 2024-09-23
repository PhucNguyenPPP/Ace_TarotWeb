import React, { useState } from 'react';
import styles from './Chat.module.scss'; // Import SCSS module
import SendIcon from '@mui/icons-material/Send';

function Chat() {
    const [newMessage, setNewMessage] = useState(""); // To handle new message input
    const [currentChatUser, setCurrentChatUser] = useState({
        id: 1,
        name: "John Doe",
        avatar: "https://via.placeholder.com/40"
    }); // Simulating currently chatting user

    const messages = [
        {
            id: 1,
            text: "Hey! How are you?",
            time: "10:00 AM",
            isSender: false
        },
        {
            id: 2,
            text: "I'm good, how about you?",
            time: "10:05 AM",
            isSender: true
        },
        {
            id: 3,
            text: "I'm doing well too!",
            time: "10:06 AM",
            isSender: false
        }
    ];

    const users = [
        {
            id: 1,
            name: "John Doe",
            lastMessage: "Hey! How are you?",
            avatar: "https://via.placeholder.com/40"
        },
        {
            id: 2,
            name: "Jane Smith",
            lastMessage: "Let's catch up later!",
            avatar: "https://via.placeholder.com/40"
        },
        {
            id: 3,
            name: "Alice Johnson",
            lastMessage: "See you tomorrow.",
            avatar: "https://via.placeholder.com/40"
        }
    ];

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            console.log("Sent message:", newMessage);
            setNewMessage(""); // Clear input field after sending
        }
    };

    return (
        <div className={styles.chatContainer}>
            {/* Sidebar for displaying chat contacts */}
            <div className={styles.chatSidebar}>
                <h1>Đoạn chat</h1>
                <ul className={styles.chatList}>
                    {users.map(user => (
                        <li className={styles.chatUser} key={user.id}>
                            <img src={user.avatar} alt={user.name} className={styles.avatar} />
                            <div className={styles.chatDetails}>
                                <p className={styles.chatName}>{user.name}</p>
                                <p className={styles.lastMessage}>{user.lastMessage}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main chat window */}
            <div className={styles.chatContent}>
                {/* Header displaying the chat user information */}
                <div className={styles.chatHeader}>
                    <img src={currentChatUser.avatar} alt={currentChatUser.name} className={styles.avatar} />
                    <h4>{currentChatUser.name}</h4>
                </div>

                {/* Chat messages */}
                <div className={styles.chatMessages}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={
                                message.isSender
                                    ? `${styles.message} ${styles.messageSent}`
                                    : `${styles.message} ${styles.messageReceived}`
                            }
                        >
                            <p>{message.text}</p>
                            <span className={styles.timestamp}>{message.time}</span>
                        </div>
                    ))}
                </div>

                {/* Chat input at the bottom */}
                <div className={styles.chatInput}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <SendIcon/>
                </div>
            </div>
        </div>
    );
}

export default Chat;
