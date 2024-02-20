import React, {useEffect, useState} from 'react';
import {Lobby, LobbyStatus} from "../../elements/types.ts";
import {subscribeLobbies} from "../../contexts/Firestore.tsx";
import {LobbyProvider, useLobby} from "../../contexts/LobbyContext.tsx";
import {Badge, Button, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function LobbiesPage() {
    const [lobbies, setLobbies] = useState<Lobby[] | []>([]);

    useEffect(() => subscribeLobbies( (lobbies: Lobby[]) => setLobbies(lobbies)), []);

    return (
        <div className='p-2 mx-auto w-100'>
            <ListGroup className=''>
                {lobbies.map(lobby => (
                    <LobbyProvider key={lobby.id} lobbyId={lobby.id} isLogin={false}>
                        <LobbyItem />
                    </LobbyProvider>
                ))}
            </ListGroup>
        </div>
    );
}

function LobbyItem() {
    const {lobby, lobbyUsers} = useLobby();
    const navigate = useNavigate();

    return (
        <ListGroup.Item variant='dark' className="d-flex justify-content-between align-items-center">
            <div>
                <h5>{lobby!.name}</h5>
                <p>Status: {lobby!.status}</p>
            </div>
            <div className='d-flex justify-content-around align-items-baseline'>
                <p className='mx-3'>Number of Players: <Badge bg="secondary">{lobbyUsers.length}/2</Badge></p>
                <Button disabled={lobbyUsers.length >= 2 || lobby?.status != LobbyStatus.CREATED} className='btn-dark' onClick={() => {
                    navigate(`/lobby/${lobby!.id}`);
                }}>Join</Button>
            </div>
        </ListGroup.Item>
    );
}

export default LobbiesPage;