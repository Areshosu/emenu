import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthenticationService from '../../../services/public/authenticationservice';

const User = () => {
    const navigate = useNavigate();

    useEffect(() => {
        redirectGuest().then((isLoggedIn) => {
            if (!isLoggedIn) {
                navigate('/welcome/outlet/6')
            }
        })
    },[navigate])

    async function redirectGuest() {
        const authService = new AuthenticationService()
        let outlet_id = window.location.href.split('/')[4]
        return authService.isLoggedIn(outlet_id)
    }
    return (
        <Outlet />
    );
}

export default User;