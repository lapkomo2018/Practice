import React from 'react';
import {Container} from "react-bootstrap";
import Signup from "../../components/Signup.tsx";

export default function RegisterPage() {
    return (
        <Container className='m-auto' style={{ maxWidth: '400px' }}>
            <Signup />
        </Container>
    );
}