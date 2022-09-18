import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import FlexTopBar from '../../components/flextopbar/flextopbar';

const Order = () => {
    return (
        <React.Fragment>
                <FlexTopBar />
            <div className='layout-content'>
                <Outlet />
                <Footer />
            </div>
        </React.Fragment>
    );
}

export default Order;