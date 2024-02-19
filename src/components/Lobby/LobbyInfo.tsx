import React from 'react';
import {User} from "../../elements/types.ts";
import {Button, Card} from "react-bootstrap";
import {useLobby} from "../../contexts/LobbyContext.tsx";

function LobbyInfo() {
    const { lobby, lobbyUsers } = useLobby();

    return (
        <div>
            <Card className='text-white' style={{background: "#4f4f4f"}}>
                <h2 className="text-center mb-3">Lobby <strong>{lobby!.name}</strong></h2>
                <Card.Body>
                    Created: {new Date(lobby!.createdAt.seconds * 1000).toLocaleString()}
                    <h4>Users in Lobby:</h4>
                    <ul>
                        {lobbyUsers.map((user: User) => (
                            <div className='d-flex align-items-center justify-content-between'>
                                <li key={user.id}>{user.name}</li>
                                <Button type='submit'></Button>
                            </div>
                        ))}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
}

export default LobbyInfo;