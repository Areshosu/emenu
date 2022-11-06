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
            let bill_no = authService.searchParam("bill_no");
            let table_id = authService.searchParam("table_id");
            // avoid table check when redirect from payment
            if (bill_no === null) {
                authService.checkTable(table_id).then((isPreviousTable) => {
                    if (!isPreviousTable) {
                        authService.deleteInfo()
                        navigate(`/welcome/outlet/${outlet_id}${search}`)
                    }
            })
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