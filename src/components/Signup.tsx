import React, {FormEvent, useRef, useState} from 'react';
import {Alert, Button, Card, Form} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import Logo from "./Logo.tsx";

export default function Signup() {

    const emailRef : any = useRef(null);
    const passRef : any = useRef(null);
    const passConfRef : any = useRef(null);
    const { signup } : any = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if(!emailRef.current || !passRef.current || !passConfRef.current)
            return;

        const email = emailRef.current.value;
        const password = passRef.current.value;
        const passwordConfirm = passConfRef.current.value;

        if (password !== passwordConfirm)
            return setError("Passwords do not match");

        try {
            setError('')
            setLoading(true);
            await signup(email, password);
            navigate('/');
        } catch (e: any) {
            setError(`Failed to create an account: ${e.message}`);
        }
        setLoading(false);
    };

    return (
        <>
            <Card className='text-white' style={{ background: "#4f4f4f" }}>
                <Card.Body>
                    <div className="text-center mb-3" style={{height: "5em"}}>
                        <Logo/>
                    </div>
                    <h2 className="text-center mb-3">Signup</h2>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passRef} required/>
                        </Form.Group>
                        <Form.Group id="passwordConfirmation" className="mb-3">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passConfRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className='w-100 btn-dark' type='submit'>Sign Up</Button>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have account? <Link to="/login">Log In</Link>
            </div>
        </>
    );
}
