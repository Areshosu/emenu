import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import FlexTopBar from '../../components/flextopbar/flextopbar';
import './order.scoped.css';

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