import React, {useContext, useEffect, useState} from "react";
import {delLobby, getUsersByLobbyId, subscribeToLobby, updateUser} from "./Firestore.tsx";
import {Lobby} from "../elements/types.ts";
import {useAuth} from "./AuthContext.tsx";


const LobbyContext = React.createContext(null);

export function useLobby(){
    return useContext(LobbyContext);
}

export function LobbyProvider({ lobbyId, children }: { lobbyId: string, children: any }) {
    const { currentUser }: any = useAuth();
    const [lobby, setLobby] = useState<Lobby | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        return subscribeToLobby(lobbyId, (lobby) => {
            if(!lobby.createdAt)
                return;

            setLobby(lobby);
            setLoading(false);
        });
    }, [lobbyId]);

    const setCurrentUserLobby = async (lobbyId: string | null) => {
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


    const value: any = {
        lobby
    };

    return(
        <LobbyContext.Provider value={value}>
            {!loading && children}
        </LobbyContext.Provider>
    )
}