import { useAuth } from "../contexts/AuthContext.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
        <div className="w-100 d-flex justify-content-around align-items-center" style={{ background: "#213547", height: '5em' }}>
            <h3>First</h3>
            <h3>First</h3>
            <h3>First</h3>
            <button disabled={loading} onClick={handleLogOut} className='btn-dark'>Log Out</button>
        </div>
    )
}
