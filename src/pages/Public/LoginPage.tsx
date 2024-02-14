import React from 'react';
import Login from "../../components/Login.tsx";
import {Container} from "react-bootstrap";

export default function LoginPage() {
    return (
        <Container className='m-auto' style={{ maxWidth: '400px' }}>
            <Login />
        </Container>
    );
}