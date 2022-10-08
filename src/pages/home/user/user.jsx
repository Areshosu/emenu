import React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import AuthenticationService from '../../../services/public/authenticationservice.js';

const User = () => {
    const navigate = useNavigate();
    const { outlet_id } = useParams();
    const { search } = useLocation();

    useEffect(() => {
        const authService = new AuthenticationService()

        authService.isLoggedIn(outlet_id).then((isLoggedIn) => {
            if (!isLoggedIn) {
                authService.deleteInfo()
                navigate(`/welcome/outlet/${outlet_id}${search}`)
            }
        })
    },[ navigate,
        outlet_id,
        search
    ])

    return (
        <Outlet />
    );
}

export default User;