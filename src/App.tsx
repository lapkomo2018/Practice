import './App.css'
import LoginPanel from "./elements/LoginPanel/LoginPanel.tsx";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "./firebase.ts";
import Body from "./elements/Body/Body.tsx";


function App() {
    const [user] = useAuthState(auth);


    return (
        <>
            {user ? <Body/> : <LoginPanel/>}
        </>
    )
}

export default App
