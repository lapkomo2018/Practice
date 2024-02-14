import React, {useState} from 'react';
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";

export default  function ProfileUpdate() {
    const { currentUser, logout } : any = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <Card className='text-white' style={{ background: "#4f4f4f" }}>
                <Card.Body>
                    <h2 className="text-center mb-3">Profile Update</h2>
                    <strong>Email:</strong> {currentUser.email}
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    <Link to='/profile' className='btn btn-dark w-100 mt-3'>Profile</Link>
                </Card.Body>
            </Card>
        </>
    );
}