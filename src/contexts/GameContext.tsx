import React, {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext.tsx";
import {Game, GameStatus, Move, Player, User} from "../elements/types.ts";
import {useNavigate} from "react-router-dom";
import {delLobby, getUserByUid, subscribeToGame, updateGame} from "./Firestore.tsx";
import {Timestamp} from "firebase/firestore";


const GameContext = createContext<
    {
        game: Game | null;
        gameUsers: User[];
    }>({
    game: null,
    gameUsers: []
});

export function useGame(){
    return useContext(GameContext);
}


export function GameProvider({ gameId, isLogin, children }: { gameId: string, isLogin: boolean, children: any }) {
    const { currentUser }: any = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [game, setGame] = useState<Game | null>(null);
    const [gameUsers, setGameUsers] = useState<User[]>([]);
    useEffect(() => {
        return subscribeToGame(gameId,  async (game: Game) => {
            if(!game.createdAt)
                return;

            if(game.players.filter((player: Player) => player.id == currentUser.uid).length == 0)
                navigate('/');

            const usersPromises: Promise<User>[] = game.players.map(async (player) => await getUserByUid(player.id));
            const users: User[] = await Promise.all(usersPromises);

            setGameUsers(users);
            setGame(game);
            setLoading(false);
        });
    }, [gameId]);

    useEffect(() => {
        const handleBeforeUnload = async () => {
            if (!isLogin || !game || game.status === GameStatus.COMPLETED)
                return;

            const winner = game.players.find((player: Player) => player.id !== currentUser.uid)?.symbol;
            if (winner) {
                await updateGame(game.id, { winner, status: GameStatus.COMPLETED });
                await delLobby(game.lobbyId);
            }
        };

        const handleUnload = () => {
            handleBeforeUnload();
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [game]);


    function calculateWinner(moves: Move[]) {
        const squares = Array(9).fill(null);
        moves.forEach((move) => squares[move.movePosition] = move.symbol);

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const doMove = async (position, symbol) =>{
        if(!game)
            return;

        const move: Move = {
            symbol: symbol,
            movePosition: position,
            timestamp: Timestamp.now()
        }
        const newMoves: Move[] = game.moves.slice();
        newMoves.push(move);

        const nextSymbol = game.current == 'X' ? 'O' : 'X'

        const winner = calculateWinner(newMoves);
        if(winner){
            await updateGame(game.id, {winner, moves: newMoves, current: nextSymbol, status: GameStatus.COMPLETED});
            await delLobby(game.lobbyId);
        }
        else
            await updateGame(game.id, {moves: newMoves, current: nextSymbol});
    }


    const value = {
        game,
        gameUsers,
        doMove,
    };

    return(
        <GameContext.Provider value={value}>
            {!loading && children}
        </GameContext.Provider>
    )
}