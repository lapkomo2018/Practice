import React, {useEffect, useState} from 'react';
import {Lobby, User} from "../elements/types.ts";
import {subscribeToLobbyUsers} from "../contexts/Firestore.tsx";
import {Container, Badge, Button, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function LobbiesComponent({ lobbies }: { lobbies: Lobby[] }) {

    return (
        <ListGroup className=''>
            {lobbies.map(lobby => (
                <LobbyItem key={lobby.id} lobby={lobby} />
            ))}
        </ListGroup>
    );
}


function LobbyItem({ lobby }: { lobby: Lobby }) {
    const [lobbyUsers, setLobbyUsers] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        return subscribeToLobbyUsers(lobby.id!, (users: User[]) => {
            try {
                setLobbyUsers(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        });
    }, [lobby.id]);




    return (
        <ListGroup.Item variant='dark' className="d-flex justify-content-between align-items-center">
            <div>
                <h5>{lobby.name}</h5>
                <p>Status: {lobby.status}</p>
            </div>
            <div className='d-flex justify-content-around align-items-baseline'>
                <p className='mx-3'>Number of Players: <Badge bg="secondary">{lobbyUsers.length}</Badge></p>
                <Button className='btn-dark' onClick={() => {
                    navigate(`/lobby/${lobby.id}`);
                }}>Join</Button>
            </div>
        </ListGroup.Item>
    );
}

export default LobbiesComponent;