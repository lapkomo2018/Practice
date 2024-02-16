import React, {FormEvent, useRef, useState} from 'react';
import {Alert, Button, Card, Form} from "react-bootstrap";
import Logo from "../Items/Logo.tsx";
import {Link} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.tsx";

function PasswordReset() {
    const emailRef : any = useRef(null);
    const { resetPassword } : any = useAuth();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async (e: FormEvent) => {
        e.preventDefault();

        if(!emailRef.current)
            return;

        const email = emailRef.current.value;

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for further instructions.');
        } catch (e: any) {
            setError(`Failed to reset password: ${ e.message }`);
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
                    <h2 className="text-center mb-3">Password Reset</h2>
                    {message && <Alert variant='success' className="mt-3">{message}</Alert>}
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    <Form onSubmit={handlePasswordReset}>
                        <Form.Group id="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className='w-100 btn-dark' type='submit'>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to='/login'>Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/register">Sign Up</Link>
            </div>
        </>
    );
}

export default PasswordReset;