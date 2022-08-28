import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../../components/topbar/topbar';
import SideBar from '../../components/sidebar/sidebar';
import Footer from '../../components/footer/footer';
import './home.scoped.css'

const Home = () => {
    return (
        <React.Fragment>
          <SideBar />
            <div className='layout-content'>
                <TopBar />
                <Outlet />
                <Footer />
            </div>
        </React.Fragment>
    );
}

export default Home;