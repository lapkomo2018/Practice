import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {Lobby, User} from "../../elements/types.ts";
import {subscribeToLobbyUsers} from "../../contexts/Firestore.tsx";
import {Card} from "react-bootstrap";

function LobbyInfo({lobby, lobbyUsers, setLobbyUsers}: { lobby: Lobby, lobbyUsers: User[], setLobbyUsers: any }) {

    useEffect(() => {
        return subscribeToLobbyUsers(lobby.id, (users: User[]) => {
            try {
                setLobbyUsers(users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        });
    }, [lobby]);




    return (
        <Card className='text-white' style={{background: "#4f4f4f"}}>
            <h2 className="text-center mb-3">Lobby <strong>{lobby.name}</strong></h2>
            <Card.Body>
                Created: {new Date(lobby.createdAt.seconds * 1000).toLocaleString()}
                <h4>Users in Lobby:</h4>
                <ul>
                    {lobbyUsers.map((user: User) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
}

export default LobbyInfo;