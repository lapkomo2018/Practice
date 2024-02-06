import "./LoginPanel.css"
import {useState} from "react";
import Logo from "/tictactoe.svg";

export default function LoginPanel(){
    const [count, setCount] = useState(0)

    return (
        <div className="LoginPanel">
            <div>
                <a href="https://youtu.be/djZe6b_xLKw?si=b3-7dOMdnmNxWgqJ" target="_blank">
                    <img src={Logo} className="logo" alt="Logo"/>
                </a>
            </div>
            <h1>Login</h1>
            <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
            <p>Something to login dadadadadadadadadad</p>
        </div>
    )
}

