import {useParams} from 'react-router-dom';
import React from 'react';
import {LobbyProvider} from "../../contexts/LobbyContext.tsx";
import {Container} from "react-bootstrap";
import LobbyInfo from "../../components/Lobby/LobbyInfo.tsx";
import LobbyChat from "../../components/Lobby/LobbyChat.tsx";

function LobbyPage() {
    const { id } = useParams<string>() || null;

    return (
        <LobbyProvider lobbyId={id as string} isLogin={true}>
            <Container className='m-auto d-flex'>
                <Container>
                    <LobbyInfo />
                </Container>
                <Container>
                    <LobbyChat />
                </Container>
            </Container>
        </LobbyProvider>
    );
}

export default LobbyPage;