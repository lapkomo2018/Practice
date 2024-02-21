import React, {FormEvent, useRef, useState} from 'react';
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.tsx";
import Logo from "../Items/Logo.tsx";

export default function Login() {
    const emailRef : any = useRef(null);
    const passRef : any = useRef(null);
    const { login, loginGoogle } : any = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if(!emailRef.current || !passRef.current)
            return;

        const email = emailRef.current.value;
        const password = passRef.current.value;

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (e: any) {
            setError(`Failed to login in account: ${ e.message }`);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async (e: FormEvent) => {
        try {
            setError('');
            setLoading(true);
            await loginGoogle();
            navigate('/');
        } catch (e: any) {
            setError(`Failed to login in account: ${ e.message }`);
        }
        setLoading(false);
    }

    return (
        <>
            <Card className='text-white' style={{ background: "#4f4f4f" }}>
                <Card.Body>
                    <div className="text-center mb-3" style={{height: "5em"}}>
                        <Logo/>
                    </div>
                    <h2 className="text-center mb-3">Login</h2>
                    <div className="d-flex align-baseline justify-content-around mb-2">
                        <button disabled={true} onClick={handleGoogleLogin} className="btn-img">
                            <img src="/google_g.svg" alt="Google Log In"/>
                        </button>
                    </div>
                    <Form onSubmit={handleLogin}>
                        <Form.Group id="email" className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className='w-100 btn-dark' type='submit'>Log In</Button>
                        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to='/reset-password'>Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account?  <Link to="/register">Sign Up</Link>
            </div>
        </>
    );
}