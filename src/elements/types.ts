import { Timestamp } from "firebase/firestore";

export interface Lobby {
    id: string;
    name: string;
    createdAt: Timestamp;
    status: LobbyStatus;
}

export enum LobbyStatus {
    CREATED = "created",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELED = "canceled"
}

export interface Game {
    id: string;
    lobbyId: string;
    players: string[];
    status: GameStatus;
    createdAt: Timestamp;
}

export enum GameStatus {
    CREATED = "created",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELED = "canceled"
}

export interface Move {
    id: string;
    gameId: string;
    playerId: string;
    movePosition: number[];
    timestamp: Timestamp;
}
export interface LobbyMessage {
    id: string;
    lobbyId: string;
    userId: string;
    content: string;
    createdAt: Timestamp;
}

export interface User {
    id: string;
    name: string;
    email: string;
    lobbyId: string | null;
    isLobbyReady: boolean | null;
}