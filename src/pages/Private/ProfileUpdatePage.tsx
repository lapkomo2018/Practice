import React from 'react';
import {Container} from "react-bootstrap";
import ProfileUpdate from "../../components/Profile/ProfileUpdate.tsx";
import Header from "../../components/Items/Header.tsx";

function ProfileUpdatePage() {
    return (
        <Container className='m-auto w-100' style={{maxWidth: '400px'}}>
            <ProfileUpdate/>
        </Container>
    );
}

export default ProfileUpdatePage;