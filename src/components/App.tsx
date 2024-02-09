import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from "../pages/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import MainPage from "../pages/MainPage.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

function App() {

    const { currentUser }: any = useAuth();

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/" element={<Navigate to={currentUser ? '/main' : '/login'}/>} />
            </Routes>
        </Router>
    );
}

export default App
