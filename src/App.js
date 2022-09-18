import './App.css';
import Error404 from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import Home from './pages/home/home';
import MenuItems from './pages/home/menu-items/menuitems.jsx';
import Order from './pages/order/order';
import Loading from './pages/loading/loading';
import Checkout from './pages/order/checkout/checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />}>
          <Route path="outlet" element={<Home />}>
            <Route path="menu-items" element={<MenuItems />} />
          </Route>
          <Route path="order" element={<Order />}>
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
