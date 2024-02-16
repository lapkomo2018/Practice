import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {Lobby, User} from "../../elements/types.ts";
import {subscribeLobbies} from "../../contexts/Firestore.tsx";
import LobbiesComponent from "../../components/LobbiesComponent.tsx";

function LobbiesPage() {

    const [error, setError] = useState('');
    const { currentUser }: any = useAuth();
    const [lobbies, setLobbies] = useState<Lobby[] | []>([]);

    useEffect(() => {
        return subscribeLobbies( (lobbies: Lobby[]) => {
            try {
                setLobbies(lobbies);
            } catch (error) {
                setError(`Error fetching lobbies: ${error}`);
            }
        });
    }, []);




    return (
        <div className='p-2 mx-auto w-100'>
            <LobbiesComponent lobbies={lobbies} />
        </div>
    );
}

export default LobbiesPage;