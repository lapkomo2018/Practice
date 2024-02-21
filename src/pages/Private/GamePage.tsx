import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {GameProvider, useGame} from "../../contexts/GameContext.tsx";
import {Move, Player} from "../../elements/types.ts";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {Container} from "react-bootstrap";
import GameBoard from "../../components/Game/GameBoard.tsx";
import GameInfo from "../../components/Game/GameInfo.tsx";

export default function GamePage() {
    const { id }: any = useParams<string>() || null;

    return (
        <GameProvider gameId={id}>
            <GameItem />
        </GameProvider>
    );
}


function GameItem() {
    const { game, doMove}: any = useGame();
    const { currentUser }: any = useAuth();
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [mySymbol, setMySymbol] = useState(null);
    const [canMove, setCanMove] = useState(false);

    useEffect(() => {
        if(!game)
            return;

        const newSquares = squares.slice();
        game.moves.forEach((move: Move) => newSquares[move.movePosition] = move.symbol);
        setSquares(newSquares);
        setMySymbol(game.players.filter((player: Player) => player.id == currentUser.uid)[0].symbol);
    }, [game]);

    useEffect(() => {
        if(!game || !mySymbol)
            return;

        setCanMove(game && !game.winner && game.current == mySymbol);
    }, [game, mySymbol]);

    const handleClick = async (i: number) => {
        if (squares[i] || !canMove)
            return;

        await doMove(i, mySymbol);
    };

    return (
        <Container className="m-auto d-flex flex-column justify-content-center align-items-center">
            <Container className='d-flex flex-column align-items-center'>
                <GameBoard squares={squares} onClick={(i: number) => handleClick(i)} />
                <GameInfo />
            </Container>
        </Container>
    );
}