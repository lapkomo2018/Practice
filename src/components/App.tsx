import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext.tsx";

import RegisterPage from "../pages/Public/RegisterPage.tsx";
import LoginPage from "../pages/Public/LoginPage.tsx";
import PasswordResetPage from "../pages/Public/PasswordResetPage.tsx";
import MainPage from "../pages/Private/MainPage.tsx";
import ProfilePage from "../pages/Private/ProfilePage.tsx";
import ProfileUpdatePage from "../pages/Private/ProfileUpdatePage.tsx";
import Header from "./Items/Header.tsx";
import LobbyPage from "../pages/Private/LobbyPage.tsx";
import GamePage from "../pages/Private/GamePage.tsx";
import LobbiesPage from "../pages/Private/LobbiesPage.tsx";

export default function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/register" element={<PublicRoute children={<RegisterPage />}/>} />
                    <Route path="/login" element={<PublicRoute children={<LoginPage />}/>} />
                    <Route path="/reset-password" element={<PublicRoute children={<PasswordResetPage />}/>} />

                    <Route path="/" element={<PrivateRoute children={<MainPage />}/>} />
                    <Route path="/profile" element={<PrivateRoute children={<ProfilePage />}/>} />
                    <Route path="/profile-update" element={<PrivateRoute children={<ProfileUpdatePage />}/>} />
                    <Route path="/lobbies" element={<PrivateRoute children={<LobbiesPage />}/>} />
                    <Route path="/lobby/:id" element={<PrivateRoute children={<LobbyPage />}/>} />
                    <Route path="/game/:id" element={<PrivateRoute children={<GamePage />}/>} />
                </Routes>
            </Router>
    );
}

function PrivateRoute({ children }: any) {
    const { currentUser }: any = useAuth();
    return (
        currentUser ?
            <div className='d-flex flex-column' style={{minHeight: "100vh"}}>
                <Header/>
                <div className="flex-grow-1 d-flex flex-column">
                    {children}
                </div>
            </div>
            : <Navigate to="/login"/>
    );
}

function PublicRoute({ children }: any) {
    return (
        <div className='d-flex flex-column' style={{minHeight: "100vh"}}>
            <div className="flex-grow-1 d-flex flex-column">
                {children}
            </div>
        </div>
    );
}