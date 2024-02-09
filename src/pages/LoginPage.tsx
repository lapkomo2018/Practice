import React from 'react';
import Login from "../elements/Login.tsx";
import {Container} from "react-bootstrap";

export default function LoginPage() {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Login />
            </div>
        </Container>
    );
}