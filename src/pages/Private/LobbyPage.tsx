import {useParams} from 'react-router-dom';
import React, {useState} from 'react';
import {LobbyProvider, useLobby} from "../../contexts/LobbyContext.tsx";
import {User} from "../../elements/types.ts";
import {Container} from "react-bootstrap";
import LobbyInfo from "../../components/Lobby/LobbyInfo.tsx";
import LobbyChat from "../../components/Lobby/LobbyChat.tsx";

function LobbyPage() {
    const { id } = useParams<string>() || null;

    return (
        <LobbyProvider lobbyId={id as string}>
            <LobbyComponent />
        </LobbyProvider>
    );
}

function LobbyComponent() {
    const { lobby }: any = useLobby();
    const [lobbyUsers, setLobbyUsers] = useState<User[]>([]);


    return (
        <Container className='m-auto d-flex'>
            <Container>
                <LobbyInfo lobby={lobby} lobbyUsers={lobbyUsers} setLobbyUsers={setLobbyUsers} />
            </Container>
            <Container>
                <LobbyChat lobby={lobby} />
            </Container>
        </Container>
    );
}

export default LobbyPage;