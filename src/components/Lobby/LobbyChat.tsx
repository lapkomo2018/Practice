import React, {FormEvent, useEffect, useState} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import ChatComponent from "../ChatComponent.tsx";
import {Lobby, LobbyMessage} from "../../elements/types.ts";
import {addLobbyMessage, subscribeToLobbyMessages} from "../../contexts/Firestore.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";

function LobbyChat({lobby}: { lobby: Lobby }) {

    const { currentUser }: any = useAuth();
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages ] = useState<LobbyMessage[]>([]);


    useEffect(() => {
        return subscribeToLobbyMessages(lobby.id!, (message: LobbyMessage) =>
            setMessages((prevMessages: LobbyMessage[]) => ([ ...prevMessages, message ])));
    }, [lobby]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if(!newMessage)
            return;

        await addLobbyMessage(lobby.id, currentUser.uid, newMessage);
        setNewMessage('');
    };


    return (
        <Card className='text-white' style={{background: "#4f4f4f"}}>
            <h2 className="text-center mb-3">Chat</h2>
            <Card.Body>
                <ul style={{minHeight: "300px", maxHeight: '300px', overflow: 'auto'}}>
                    <ChatComponent messages={messages}></ChatComponent>
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

export default LobbyChat;