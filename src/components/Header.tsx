import { useAuth } from "../contexts/AuthContext.tsx";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "./Logo.tsx";
import {Container, Nav, Navbar} from "react-bootstrap";

export default function Header(){
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
        <Navbar className="p-2" bg='dark' data-bs-theme="dark" style={{ height: '5em'}}>
            <Navbar.Brand style={{height: "3.5em"}}>
                <Logo/>
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <div className='d-flex flex-column text-center'>
                <Link to="/profile">Profile</Link>
                <button disabled={loading} onClick={handleLogOut} className='btn-dark' style={{textWrap: "nowrap"}}>Log Out</button>
            </div>
        </Navbar>
    )
}
