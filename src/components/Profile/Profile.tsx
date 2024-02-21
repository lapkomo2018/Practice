import React, {useState} from 'react';
import {Alert, Button, Card} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.tsx";

export default  function Profile() {
    const { currentUser, updateAuthProfile } : any = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState(currentUser.displayName);
    const navigate = useNavigate();

    const handleSaveName = async () => {
        await updateAuthProfile({displayName: newName});
        window.location.reload();
        setEditingName(false);
    };

    const handleCancelNameEdit = () => {
        setNewName(currentUser.displayName);
        setEditingName(false);
    };

    return (
        <>
            <Card className='text-white' style={{ background: "#4f4f4f" }}>
                <Card.Body>
                    <h2 className="text-center mb-3">Profile</h2>
                    <strong>Email: </strong>{currentUser.email} <br/>
                    <strong>Name: </strong>{editingName ? (
                    <form onSubmit={handleSaveName} className='d-flex  align-items-center'>
                        <input type="text" value={newName} onChange={(e: any) => setNewName(e.target.value)} />
                        <Button type='submit' variant="success" className='mx-1'>Save</Button>
                        <Button variant="danger" onClick={handleCancelNameEdit}>Cancel</Button>
                    </form>
                ) : (
                    <>
                        {currentUser.displayName ? currentUser.displayName : "None"}
                        <Button className='btn-dark mx-1 my-auto' onClick={() => setEditingName(true)}>Edit</Button>
                    </>
                )}
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Card.Body>
            </Card>
        </>
    );
}