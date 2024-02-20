import React, {useContext, useEffect, useState} from "react";
import {
    addLobbyMessage,
    createGame,
    delLobby,
    getUsersByLobbyId,
    subscribeToLobby,
    subscribeToLobbyMessages,
    subscribeToLobbyUsers,
    updateLobby,
    updateUser
} from "./Firestore.tsx";
import {Game, GameStatus, Lobby, LobbyMessage, LobbyStatus, Player, User} from "../elements/types.ts";
import {useAuth} from "./AuthContext.tsx";
import {useNavigate} from "react-router-dom";

const LobbyContext = React.createContext<
    {
    lobby: Lobby | null;
    lobbyUsers: User[];
    messages: LobbyMessage[];
    sendMessage: (message: string) => Promise<any>;
    setLobbyReady: (isLobbyReady: boolean) => Promise<any>;
}>({
    lobby: null,
    lobbyUsers: [],
    messages: [],
    sendMessage: async (message: string) => { return null },
    setLobbyReady: async (isLobbyReady: boolean) => { return null },
});


export function useLobby(){
    return useContext(LobbyContext);
}

export function LobbyProvider({ lobbyId, isLogin, children }: { lobbyId: string, isLogin: boolean, children: any }) {
    const { currentUser }: any = useAuth();
    const [lobby, setLobby] = useState<Lobby | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const sendMessage = async (message: string) => await addLobbyMessage(lobby!.id, currentUser.uid, message);
    const setLobbyReady = async (isLobbyReady: boolean) => {
        const readyUsers = lobbyUsers.filter((user) => user.isLobbyReady === true)

        if(readyUsers.length == 1)
            startGame(lobbyUsers);


        await updateUser(currentUser.uid, { isLobbyReady });
    }

    const [lobbyUsers, setLobbyUsers] = useState<User[]>([]);
    useEffect(() => {
        if(!lobby || !lobby.id)
            return;
        return subscribeToLobbyUsers(lobby.id, (users: User[]) => {
            setLobbyUsers(users);
        });
    }, [lobby]);

    const [messages, setMessages ] = useState<LobbyMessage[]>([]);
    useEffect(() => {
        if(!lobby || !lobby.id)
            return;

        return subscribeToLobbyMessages(lobby.id, (message: LobbyMessage) =>
            setMessages((prevMessages: LobbyMessage[]) => ([ ...prevMessages, message ])));
    }, [lobby]);



    useEffect(() => {
        return subscribeToLobby(lobbyId, (lobby) => {
            if(!lobby.createdAt)
                return;

            setLobby(lobby);
            setLoading(false);
        });
    }, [lobbyId]);


    const startGame = async (users: User[]) =>{

        const players: Player[] = [{id: users[0].id, symbol: 'X'}, {id: users[1].id, symbol: 'O'}]
        const lobbyId = users[0].lobbyId!;

        const game: Partial<Game> = {
            lobbyId: lobbyId,
            players: players,
            moves: [],
            status: GameStatus.CREATED,
        }

        const gameId = await createGame(game as Game);
        await updateLobby(lobbyId, { status: LobbyStatus.IN_PROGRESS, gameId });
    }


    useEffect( () => {
        if(lobby == null || !lobby.createdAt || !isLogin)
            return;

        if(lobby!.gameId != null)
            navigate(`/game/${lobby!.gameId}`);

    }, [lobby]);


    const setCurrentUserLobby = async (lobbyId: string | null) => {
        if(!isLogin)
            return;

        if(lobby){
            const lobbyUsers = await getUsersByLobbyId(lobby.id);
            if(lobbyUsers.length >= 2 && lobby.gameId === null)
                navigate('/lobbies');

            if(lobbyId == null) {
                if (lobbyUsers.length === 1 && lobbyUsers[0].id === currentUser.uid)
                    await delLobby(lobby!.id);
            }
        }

        await updateUser(currentUser.uid, { lobbyId, isLobbyReady: false });
    }
    useEffect(() => {
        if (lobby != null)
            setCurrentUserLobby(lobby.id);

        window.addEventListener('beforeunload', () => setCurrentUserLobby(null));
        return () => {
            setCurrentUserLobby(null);
            window.removeEventListener('beforeunload', () => setCurrentUserLobby(null));
        };
    }, [lobby]);


    const value = {
        lobby,
        lobbyUsers,
        messages,
        sendMessage,
        setLobbyReady
    };

    return(
        <LobbyContext.Provider value={value}>
            {!loading && children}
        </LobbyContext.Provider>
    )
}