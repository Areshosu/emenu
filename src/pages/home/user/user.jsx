import React from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthenticationService from '../../../services/public/authenticationservice.js';

const User = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authService = new AuthenticationService()
        let outlet_id = window.location.href.split('/')[4]

        authService.isLoggedIn(outlet_id).then((isLoggedIn) => {
            if (!isLoggedIn) {
                authService.deleteInfo()
                navigate(`/welcome/outlet/${outlet_id}`)
            }
        })
    },[navigate])

    return (
        <Outlet />
    );
}

export default User;