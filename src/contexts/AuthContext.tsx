import React, {useContext, useEffect, useState} from 'react';
import {auth} from "../firebase.ts";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
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


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( async (user: any) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                // Проверяем, существует ли пользователь в базе данных Firestore
                const userData = await getUserByUid(user.uid);
                if (!userData) {
                    // Если пользователя нет в базе данных, создаем его
                    await createUser(user);
                } else {
                    if (userData.email !== user.email) {
                        // Если данные отличаются, обновляем запись в базе данных
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
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );

}