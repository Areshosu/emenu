import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './topbar';
import Footer from './footer';

const Home = () => {
    return ( 
        <React.Fragment>
    <TopBar />
    <Outlet />
    <Footer />
        </React.Fragment>
     );
}
 
export default Home;