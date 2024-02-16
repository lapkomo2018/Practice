import React, {FormEvent, useRef, useState} from 'react';
import { useAuth } from "../../contexts/AuthContext.tsx";
import {Container, Button, Form, Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {addData} from "../../contexts/Firestore.tsx";
import {Timestamp} from "firebase/firestore";
import {LobbyStatus} from "../../elements/types.ts";

export default function MainPage() {
    const { currentUser } : any = useAuth();

    const lobbyNameRef : any = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateLobby = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);

            const lobbyName = lobbyNameRef.current.value;

            if(!lobbyName)
                return;

            const docRef: any = await addData('lobbies', {
                name: lobbyName,
                status: LobbyStatus.CREATED,
                createdBy: currentUser.uid,
                createdAt: Timestamp.now()
            });

            const lobbyId = docRef.id;

            navigate(`/lobby/${lobbyId}`);
        } catch (error) {
            setError(`Error while creating game: ${error}`);
        }
        setLoading(false);
    };



    return (
        <Container className='m-auto'>
                <h1>Create Lobby</h1>
                <Form onSubmit={handleCreateLobby}>
                    <Form.Group className='mb-2'>
                        <Form.Control type="text" ref={lobbyNameRef} required />
                    </Form.Group>
                    <Button disabled={loading} type='submit' variant="primary">Create</Button>
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Form>
        </Container>
    );
}