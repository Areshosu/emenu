import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingLogo from '../../assets/images/powered-logo-loader.png'
import './loading.scoped.css';

function Loading() {
    const loadingStatus = useSelector((state) => state.appstat.isLoading)

        return (
            <React.Fragment>
                <div>
                    <div className='loading-container' style={{display: loadingStatus? 'flex':'none'}}>
                        <img className='loading-logo' src={LoadingLogo} alt="powered-by-pacom.png" />
                    </div>
                    <Outlet/>
                </div>
            </React.Fragment>
        );
}

export default Loading;