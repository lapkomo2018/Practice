import React from 'react';
import {User} from "../../elements/types.ts";
import {Button, Card} from "react-bootstrap";
import {useLobby} from "../../contexts/LobbyContext.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";

function LobbyInfo() {
    const { lobby, lobbyUsers, setLobbyReady } = useLobby();
    const { currentUser }: any = useAuth();

    return (
        <div>
            <Card className='text-white' style={{background: "#4f4f4f"}}>
                <h2 className="text-center mb-3">Lobby <strong>{lobby!.name}</strong></h2>
                <Card.Body>
                    Created: {new Date(lobby!.createdAt.seconds * 1000).toLocaleString()}
                    <h4>Users in Lobby:</h4>
                    <ul>
                        {lobbyUsers.map((user: User) => (
                            <div key={user.id} className='d-flex align-items-center justify-content-between'>
                                <li >{user.name}</li>
                                {user.id == currentUser.uid ?
                                    <Button className='btn-dark' onClick={() => setLobbyReady(!user.isLobbyReady)}>{user.isLobbyReady ? 'Ready' : 'No Ready'}</Button> :
                                    <strong className='mx-3'>{user.isLobbyReady ? 'Ready' : 'No Ready'}</strong>}
                            </div>
                        ))}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
}

export default LobbyInfo;