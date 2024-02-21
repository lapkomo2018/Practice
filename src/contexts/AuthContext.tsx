import React, {useContext, useEffect, useState} from 'react';
import {auth} from "../firebase.ts";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import {createUser, getUserByUid, updateUser} from "./Firestore.tsx";

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

    function loginGoogle(){
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    function signup(email: string, password: string){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logout(){
        return signOut(auth);
    }

    function resetPassword(email: string){
        return sendPasswordResetEmail(auth, email);
    }

    function updateAuthProfile(data: any){
        return updateProfile(auth.currentUser, data);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( async (user: any) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const userData = await getUserByUid(user.uid);
                if (!userData) {
                    await createUser(user);
                } else {
                    if (userData.email !== user.email) {
                        await updateUser(user.uid, { email: user.email });
                    }
                }
            }
        });

        return unsubscribe;
    }, []);

    const value : any = {
        currentUser,
        login,
        loginGoogle,
        signup,
        logout,
        resetPassword,
        updateAuthProfile,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );

}