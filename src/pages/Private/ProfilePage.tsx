import React from 'react';
import {Container} from "react-bootstrap";
import Profile from "../../components/Profile/Profile.tsx";
import Header from "../../components/Items/Header.tsx";

export default function ProfilePage() {
    return (
        <Container className='m-auto' style={{maxWidth: '400px'}}>
            <Profile/>
        </Container>
    );
}
