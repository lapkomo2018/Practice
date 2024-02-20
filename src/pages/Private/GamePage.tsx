import React from 'react';
import {useParams} from "react-router-dom";

function GamePage() {
    const { id } = useParams<string>() || null;

    return (
        <div>
            game id {id}
        </div>
    );
}

export default GamePage;