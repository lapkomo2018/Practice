import React from 'react';
import {Container} from "react-bootstrap";
import Signup from "../elements/Signup.tsx";

export default function RegisterPage() {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Signup />
            </div>
        </Container>
    );
}