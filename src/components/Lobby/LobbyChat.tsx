import React, {FormEvent, useEffect, useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {LobbyMessage} from "../../elements/types.ts";
import {getUserByUid} from "../../contexts/Firestore.tsx";
import {useLobby} from "../../contexts/LobbyContext.tsx";

function LobbyChat() {
    const { sendMessage }: any = useLobby();
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        if(!newMessage)
            return;

        sendMessage(newMessage);
        setNewMessage('');
    };

    return (
        <Card className='text-white' style={{background: "#4f4f4f"}}>
            <h2 className="text-center mb-3">Chat</h2>
            <Card.Body>
                <ul style={{minHeight: "300px", maxHeight: '300px', overflow: 'auto'}}>
                    <ChatComponent />
                </ul>
                <Form onSubmit={handleSendMessage}>
                    <Form.Group>
                        <Form.Control
                            type='text'
                            placeholder='Type your message...'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                    </Form.Group>
                    <Button type='submit' className='btn-dark mt-2'>Send</Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

function ChatComponent() {
    const { messages }: { messages: LobbyMessage[] | [] } = useLobby();
    const [userNamesCache, setUserNamesCache] = useState<any>({});

    useEffect(() => {
        messages.forEach(message => {
            if (!userNamesCache[message.userId]) {
                fetchUserName(message.userId);
            }
        });
    }, [messages, userNamesCache]);

    const fetchUserName = async (userId: string) => {
        try {
            const userName = await getUserByUid(userId);
            setUserNamesCache((prevCache: any) => ({ ...prevCache, [userId]: userName?.name }));
        } catch (error) {
            console.error('Error fetching user name:', error);
        }
    };

    return (
        <>
            {messages.map(message => (
                <li key={message.id}>
                    <strong>{userNamesCache[message.userId] || 'Loading...'}</strong>: {message.content}
                </li>
            ))}
        </>
    );
}

export default LobbyChat;