import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {GameProvider, useGame} from "../../contexts/GameContext.tsx";
import {Move, Player, User} from "../../elements/types.ts";
import {useLobby} from "../../contexts/LobbyContext.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";

export default function GamePage() {
    const { id }: any = useParams<string>() || null;

    return (
        <GameProvider gameId={id} isLogin={true}>
            <Game />
        </GameProvider>
    );
}


function Game() {
    const { game, doMove} = useGame();
    const { currentUser } = useAuth();
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [mySymbol, setMySymbol] = useState(null);
    const [canMove, setCanMove] = useState(false);

    useEffect(() => {
        if(!game)
            return;

        const newSquares = squares.slice();
        game.moves.forEach((move) => newSquares[move.movePosition] = move.symbol);
        setSquares(newSquares);
        setMySymbol(game.players.filter((player) => player.id == currentUser.uid)[0].symbol);
    }, [game]);

    useEffect(() => {
        if(!game || !mySymbol)
            return;

        setCanMove(game && !game.winner && game.current == mySymbol);
    }, [game, mySymbol]);

    const handleClick = async (i) => {
        if (squares[i] || !canMove)
            return;

        await doMove(i, mySymbol);
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={squares} onClick={(i) => handleClick(i)} />
            </div>
            <GameInfo />
            My symbol: {mySymbol}
            <br/>
            Can move: {canMove ? 'true' : 'false'}
        </div>
    );
}
function Board({ squares, onClick }) {
    const renderSquare = (i) => {
        return (
            <button onClick={() => onClick(i)} style={{width: '100px', height: '100px'}}>
                {squares[i]}
            </button>
        );
    };

    return (
        <div>
            <div className="row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}



function GameInfo() {
    const { game, gameUsers } = useGame();

    let status;
    if (game?.winner) {
        status = 'Winner: ' + game.winner;
    } else {
        status = 'Next player: ' + game?.current;
    }

    return (
        <div className="game-info">
            <div>{gameUsers.map((user: User) => <div key={user.id}>{user.name}: {game!.players.filter((player: Player) => player.id == user.id)[0].symbol}</div>)}</div>
            <div>{status}</div>
        </div>
    );
}