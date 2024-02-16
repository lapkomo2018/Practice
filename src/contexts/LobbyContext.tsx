import React, {useContext, useEffect, useState} from "react";
import {
    addLobbyMessage,
    delLobby,
    getUsersByLobbyId,
    subscribeToLobby, subscribeToLobbyMessages,
    subscribeToLobbyUsers,
    updateUser
} from "./Firestore.tsx";
import {Lobby, LobbyMessage, User} from "../elements/types.ts";
import {useAuth} from "./AuthContext.tsx";

const LobbyContext = React.createContext<
    {
    lobby: Lobby | null;
    lobbyUsers: User[];
    messages: LobbyMessage[];
    sendMessage: (message: string) => Promise<any>
}>({
    lobby: null,
    lobbyUsers: [],
    messages: [],
    sendMessage: async (message: string) => { return message; },
});


export function useLobby(){
    return useContext(LobbyContext);
}

export function LobbyProvider({ lobbyId, isLogin, children }: { lobbyId: string, isLogin: boolean, children: any }) {
    const { currentUser }: any = useAuth();
    const [lobby, setLobby] = useState<Lobby | null>(null);
    const [loading, setLoading] = useState(true);


    const sendMessage = async (message: string) => await addLobbyMessage(lobby!.id, currentUser.uid, message);

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


    const setCurrentUserLobby = async (lobbyId: string | null) => {
        if(!isLogin)
            return;

        if(lobbyId == null && lobby != null)
            if ((await getUsersByLobbyId(lobby.id)).length === 1)
                await delLobby(lobby.id);

        await updateUser(currentUser.uid, { lobbyId });
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
        sendMessage
    };

    return(
        <LobbyContext.Provider value={value}>
            {!loading && children}
        </LobbyContext.Provider>
    )
}