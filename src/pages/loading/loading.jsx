import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import './loading.scoped.css';
import { useLocation } from 'react-router-dom';
import StorageService from '../../services/public/storageservice';

function Loading() {
    const location = useLocation()
    const loadingStatus = useSelector((state) => state.appstat.isLoading)

    const findShopImage = () => {
        if (!location.pathname.includes('/welcome/outlet')) {
            const storageService = new StorageService()
            let shop = JSON.parse(storageService.retrieveInfo('outlet'))
            return shop?.image
        }
    }

        return (
            <React.Fragment>
                <div>
                    <div className='loading-container' style={{display: loadingStatus? 'flex':'none'}}>
                       {
                            findShopImage()? 
                        <img className='loading-logo' src={`${process.env.REACT_APP_BACKEND_URL}/uploads/outlet/${findShopImage()}`} alt="shop-logo.png" /> :
                        <SyncLoader className='loading-logo-default' color='grey'/>
                       }
                    </div>
                    <Outlet/>
                </div>
            </React.Fragment>
        );
}

export default Loading;