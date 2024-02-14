import {useParams} from 'react-router-dom';
import React, {FormEvent, useEffect, useState} from 'react';
import {Lobby, LobbyMessage, User} from "../../elements/types.ts";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {
    addLobbyMessage, getUsersByLobbyId,
    subscribeToLobbyMessages, subscribeToLobbyUsers,
    subscribeToRowChanges,
    updateUser
} from "../../contexts/Firestore.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";
import ChatComponent from '../../components/ChatComponent.tsx';

function LobbyPage() {
    const [error, setError] = useState('');
    const { currentUser }: any = useAuth();
    const { id } = useParams<string>() || null;
    const [lobby, setLobby] = useState<Lobby | null>(null);
    const [lobbyUsers, setLobbyUsers] = useState<User[]>([]);

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages ] = useState<LobbyMessage[]>([]);

    useEffect(() => {
        if(!id)
            return;

        try {
            const unsubscribe = subscribeToRowChanges('lobbies', id, (doc) => {
                if (doc.exists()) {
                    setLobby(doc.data());
                }
                else {
                    setError('Lobby doesnt exist');
                }
            });

            return unsubscribe;
        } catch (error) {
            setError(`Error while fetching lobby: ${error}`);
        }
    }, [id]);

    useEffect(() => {
        if (!id)
            return;

        const unsubscribe = subscribeToLobbyMessages(id, (message: LobbyMessage) => {
            setMessages( (prevMessages: LobbyMessage[]) => ([ ...prevMessages, message ]));
        });

        return unsubscribe;
    }, [id]);

    useEffect(() => {
        if (!id)
            return;

        const unsubscribe = subscribeToLobbyUsers(id, (users: User[]) => {
            try {
                setLobbyUsers(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        });

        return unsubscribe;
    }, [id]);


    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if(!id)
            return;
        try {
            await addLobbyMessage(id, currentUser.uid, newMessage);
        } catch (error) {
            setError(`Error while fetching lobby: ${error}`);
        }
        setNewMessage('');
    };

    const setCurrentUserLobby = async (lobbyId: string | null) => {
        try {
            if(lobbyId && !lobby)
                return;

            await updateUser(currentUser.uid, { lobbyId });
        } catch (error) {
            setError(`Error adding user to lobby: ${error}`);
        }
    }

    useEffect(() => {
        setCurrentUserLobby(id as string);

        return () => {
            setCurrentUserLobby(null);
        };
    }, [id, currentUser, lobby]);

    useEffect(() => {
        window.addEventListener('beforeunload', () => setCurrentUserLobby(null));
        return () => {
            window.removeEventListener('beforeunload', () => setCurrentUserLobby(null));
        };
    }, []);

    return (
        <Container className='m-auto d-flex'>
            <Container>
                {lobby &&
                    <Card className='text-white' style={{background: "#4f4f4f"}}>
                        <h2 className="text-center mb-3">Lobby <strong>{lobby.name}</strong></h2>
                        <Card.Body>
                            Created: {new Date(lobby.createdAt.seconds * 1000).toLocaleString()}
                            <h2>Users in Lobby:</h2>
                            <ul>
                                {lobbyUsers.map((user: User) => (
                                    <li key={user.id}>{user.name}</li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Container>
            <Container>
                <Card className='text-white' style={{background: "#4f4f4f"}}>
                    <h2 className="text-center mb-3">Chat</h2>
                    <Card.Body>
                        <ul style={{minHeight: "300px"}}>
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
            </Container>
        </Container>
    );
}

export default LobbyPage;