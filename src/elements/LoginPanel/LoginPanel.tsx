import "./LoginPanel.css"
import Logo from "/tictactoe.svg";
import GoogleIcon from "/google_g.svg"
import { useRef, FormEvent } from "react";
import { auth, firestore } from "../../firebase"
import { addDoc, collection } from "firebase/firestore"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


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
        console.log(`Email: ${email} \nPassword: ${password}`);

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

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if(!credential)
                    return;
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    };


    return (
        <form className="LoginPanel" onSubmit={handleLogin}>
            <div className="logo">
                <a href="https://youtu.be/djZe6b_xLKw?si=b3-7dOMdnmNxWgqJ" target="_blank">
                    <img src={Logo} alt="Logo"/>
                </a>
            </div>
            <div className="AlternativeLogins">
                <button onClick={signInWithGoogle}>
                    <img src={GoogleIcon} alt="Google LogIn"/>
                </button>
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

