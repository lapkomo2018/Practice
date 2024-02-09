import React from 'react';
import { useAuth } from "../contexts/AuthContext.tsx";
import Header from "../elements/Header.tsx";

export default function MainPage() {

    const { currentUser } : any = useAuth();

    return (
        <div>
            <Header />
            <h1>U logged, {currentUser.email}</h1>
        </div>
    );
}