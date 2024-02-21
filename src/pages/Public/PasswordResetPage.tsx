import React from 'react';
import {Container} from "react-bootstrap";
import PasswordReset from "../../components/Auth/PasswordReset.tsx";

export default function PasswordResetPage() {
    return (
        <Container className='m-auto' style={{ maxWidth: '400px' }}>
            <PasswordReset />
        </Container>
    );
}
