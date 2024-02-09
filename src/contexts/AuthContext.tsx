import React, {useContext, useEffect, useState} from 'react';
import { auth } from "../firebase.ts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = React.createContext(null);

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }: any){
    const [currentUser, setCurrentUser] : any = useState(auth.currentUser);
    const [loading, setLoading] = useState(true)

    function login(email: string, password: string){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signup(email: string, password: string){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value : any = {
        currentUser,
        login,
        signup,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );

}