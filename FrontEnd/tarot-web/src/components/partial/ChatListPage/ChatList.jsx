import React, { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.scss';
import { CircularProgress } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { GetAllChatUsers, GetMessage, SendMessage } from '../../../api/ChatApi';

function ChatList() {
    const [newMessage, setNewMessage] = useState("");
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatUsers, setChatUsers] = useState([]);
    const { user } = useAuth();
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null); // Tạo ref cho phần cuối của danh sách tin nhắn

    const fetchGetMessages = async () => {
        if (currentChatUser) {
            const response = await GetMessage(user.userId, currentChatUser.userId);
            if (response.ok) {
                const responseData = await response.json();
                setMessages(responseData.result);
            } else {
                console.error('Failed to fetch messages');
            }
        }
    };

    const fetchGetAllChatUsers = async () => {
        const response = await GetAllChatUsers(user.userId);
        if (response.ok) {
            const responseData = await response.json();
            setChatUsers(responseData.result);
            if (responseData.result.length > 0) {
                setCurrentChatUser(responseData.result[0]);
            }
        } else {
            console.error('Failed to fetch chat users');
        }
    };

    useEffect(() => {
        if (user) {
            fetchGetAllChatUsers();
        }
    }, [user]);

    useEffect(() => {
        if (currentChatUser) {
            fetchGetMessages();
            setLoading(false);
        }
    }, [currentChatUser]);

    useEffect(() => {
        if (user) {
            socketRef.current = new WebSocket(`ws://localhost:5027/ws`);

            socketRef.current.onmessage = (event) => {
                const newMessage = JSON.parse(event.data);
                if (newMessage.receiveUserId === user.userId && newMessage.sendUserId === currentChatUser.userId) {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
                // fetchGetAllChatUsers();
            };

            return () => {
                socketRef.current.close();
            };
        }
    }, [user, currentChatUser]);

    const handleSendMessage = async (event) => {
        if (event.key === 'Enter' && newMessage.trim()) {
            const messageData = {
                content: newMessage,
                sendUserId: user.userId,
                receiveUserId: currentChatUser.userId,
                createdDate: new Date().toISOString()
            };

            socketRef.current.send(JSON.stringify(messageData));
            const response = await SendMessage(messageData);
            if (response.ok) {
                fetchGetMessages();
            }
            setNewMessage("");
        }
    };

    const handleChangeChatUser = (user) => {
        setCurrentChatUser(user);
        setMessages([]);
        fetchGetMessages();
    };

    // Hàm cuộn đến cuối danh sách tin nhắn
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Gọi hàm scrollToBottom mỗi khi messages thay đổi
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (loading) {
        return (
            <div className='flex justify-center h-screen mt-10'>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatSidebar}>
                <h1>Đoạn chat</h1>
                <ul className={styles.chatList}>
                    {chatUsers.map(user => (
                        <li
                            className={styles.chatUser}
                            key={user.userId}
                            onClick={() => handleChangeChatUser(user)}
                        >
                            <img
                                src={user.avatarLink}
                                alt={user.nickName || user.fullName}
                                className={styles.avatar}
                            />
                            <div className={styles.chatDetails}>
                                <p className={styles.chatName}>{user.nickName || user.fullName}</p>
                                <p className={styles.lastMessage}>{user.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.chatContent}>
                <div className={styles.chatHeader}>
                    {currentChatUser && (
                        <>
                            <img src={currentChatUser.avatarLink} alt={currentChatUser.nickName || currentChatUser.fullName} className={styles.avatar} />
                            <h4>{currentChatUser.nickName || currentChatUser.fullName}</h4>
                        </>
                    )}
                </div>

                <div className={styles.chatMessages}>
                    {messages.map((message) => (
                        <div
                            key={message.messageId}
                            className={
                                message.receiveUserId === user.userId
                                    ? `${styles.message} ${styles.messageReceived}`
                                    : `${styles.message} ${styles.messageSent}`
                            }
                        >
                            <p>{message.content}</p>
                            <span className={styles.timestamp}>{new Date(message.createdDate).toLocaleString()}</span>
                        </div>
                    ))}
                    {/* Thêm một div để cuộn xuống */}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.chatInput}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        onKeyDown={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatList;
