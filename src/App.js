import './App.css';
import Error404 from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import Home from './pages/home/home';
import MenuItems from './pages/home/menu-items/menuitems.jsx';
import Order from './pages/order/order';
import Loading from './pages/loading/loading';
import Checkout from './pages/order/checkout/checkout';
import User from './pages/home/user/user';
import Outlet from './pages/welcome/outlet/outlet';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />}>
          <Route path="outlet/:outlet_id">
            <Route path="user" element={<User />}>
              <Route path="menu" element={<Home />}>
                <Route path="menu-items" element={<MenuItems />} />
              </Route>
              <Route path="order" element={<Order />}>
                <Route path="checkout" element={<Checkout />} />
              </Route>
            </Route>
          </Route>
          <Route path="welcome">
            <Route path="outlet/:outlet_id" element={<Outlet />}/>
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
