import React, {useState} from 'react';
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";

export default  function Profile() {
    const { currentUser, logout } : any = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        setError('');
        setLoading(true);

        try {
            await logout();
            navigate('/');
        } catch (e : any) {
            setError(`Error : ${e.message}`);
        }
        setLoading(false);
    }

    return (
        <>
            <Card className='text-white' style={{ background: "#4f4f4f" }}>
                <Card.Body>
                    <h2 className="text-center mb-3">Profile</h2>
                    <strong>Email:</strong> {currentUser.email}
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    <Link to='/profile-update' className='btn btn-dark w-100 mt-3'>Update</Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleLogOut}>Log Out</Button>
            </div>

        </>
    );
}