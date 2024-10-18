import React, { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.scss';
import { CircularProgress } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { GetAllChatUsers, GetMessage, SendMessage } from '../../../api/ChatApi';
import InboxIcon from '@mui/icons-material/Inbox';
import { useLocation } from 'react-router-dom';
import { GetTarotReaderDetail } from '../../../api/TarotReaderApi';

const baseUrlWebSocket = import.meta.env.VITE_WEB_SOCKET_HOST;
function Chat() {
    console.log(baseUrlWebSocket)
    const [newMessage, setNewMessage] = useState("");
    const [currentChatUserId, setCurrentChatUserId] = useState('');
    const [currentChatUser, setCurrentChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);
    const location = useLocation();
    const { customerId, tarotReaderId } = location.state || {};

    const fetchGetMessages = async () => {
        setLoading(true);
        if (currentChatUserId) {
            const response = await GetMessage(user.userId, currentChatUserId);
            if (response.ok) {
                const responseData = await response.json();
                setMessages(responseData.result);
            } else {
                console.error('Failed to fetch messages');
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!user) {
            return;
        }
        if (currentChatUserId === '') {
            if (user.userId === customerId) {
                setCurrentChatUserId(tarotReaderId)
            } else {
                setCurrentChatUserId(customerId);
            }
        }

        fetchGetMessages();
    }, [user, customerId, tarotReaderId]);

    useEffect(() => {
        const fetchTarotReaderDetail = async () => {
            setLoading(true);
            const response = await GetTarotReaderDetail(currentChatUserId);
            if (response.ok) {
                const responseData = await response.json();
                setCurrentChatUser(responseData.result);
            } else {
                throw new Error('Failed to fetch tarot reader detail');
            }
            setLoading(false);
        };

        fetchTarotReaderDetail();
        fetchGetMessages();
    }, [currentChatUserId])

    useEffect(() => {
        if (user) {
            socketRef.current = new WebSocket(`${baseUrlWebSocket}/ws`);

            socketRef.current.onmessage = (event) => {
                const newMessage = JSON.parse(event.data);
                if (newMessage.receiveUserId === user.userId && newMessage.sendUserId === currentChatUserId) {
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                }
                // fetchGetAllChatUsers();
            };

            return () => {
                socketRef.current.close();
            };
        }
    }, [user, currentChatUserId]);

    const handleSendMessage = async (event) => {
        if (event.key === 'Enter' && newMessage.trim()) {
            const messageData = {
                content: newMessage,
                sendUserId: user.userId,
                receiveUserId: currentChatUserId,
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

    // Hàm cuộn đến cuối danh sách tin nhắn
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Gọi hàm scrollToBottom mỗi khi messages thay đổi
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
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

export default Chat;
