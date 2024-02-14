import React from 'react';
import Login from "../../components/Login.tsx";
import {Container} from "react-bootstrap";
import PasswordReset from "../../components/PasswordReset.tsx";

export default function PasswordResetPage() {
    return (
        <Container className='m-auto' style={{ maxWidth: '400px' }}>
            <PasswordReset />
        </Container>
    );
}
