import {useGame} from "../../contexts/GameContext.tsx";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {Button, Card} from "react-bootstrap";
import {Player, User} from "../../elements/types.ts";
import React from "react";

export default function GameInfo() {
    const {game, gameUsers} = useGame();
    const { currentUser }: any = useAuth();

    const status = game?.winner
        ? 'Winner: ' + game.winner
        : 'Next player: ' + game?.current;

    return (
        <div className='mt-2 d-flex align-items-start'>
            <Card className='text-white' style={{background: "#4f4f4f"}}>
                <Card.Body>
                    {gameUsers.map((user: User) =>
                        <div key={user.id}>
                            {`${user.name}: `}
                            {game!.players.filter((player: Player) => player.id == user.id)[0].symbol}
                            {user.id == currentUser.uid && " (You)"}
                        </div>
                    )}
                    <div>{status}</div>
                </Card.Body>
            </Card>
            { game?.winner && <Button className='btn-dark mx-2 px-3' href='/'>Exit</Button> }
        </div>
    );
}