import React from 'react';
import {Link} from "react-router-dom";

export default function Logo() {
    return (
        <>
            <Link to="/">
                <img src="/tictactoe.svg" alt="Logo" className="img-fluid hover-shake-right"
                     style={{height: "100%"}}/>
            </Link>
        </>
    );
}