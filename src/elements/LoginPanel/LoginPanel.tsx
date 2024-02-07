import "./LoginPanel.css"
import Logo from "/tictactoe.svg";
import { useRef, FormEvent } from "react";
import { firestore } from "../../firebase"
import { addDoc, collection } from "firebase/firestore"

export default function LoginPanel(){
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const ref = collection(firestore, "UsersTest");


    const handleLogin = (e: FormEvent) => {
        e.preventDefault();

        if(!emailRef.current || !passRef.current)
            return;

        const email = emailRef.current.value;
        const password = passRef.current.value;
        console.log(`Email: ${email} \nPassword:: ${password}`);

        let data = {
            email: email,
            password: password,
        }

        try {
            addDoc(ref, data).then(() => {
                alert("Good");
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form className="LoginPanel" onSubmit={handleLogin}>
            <div className="logo">
                <a href="https://youtu.be/djZe6b_xLKw?si=b3-7dOMdnmNxWgqJ" target="_blank">
                    <img src={Logo} alt="Logo"/>
                </a>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" ref={emailRef} id="email" name="email" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" ref={passRef} id="password" name="password" required/>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

