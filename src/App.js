import './App.css';
import Error404 from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import Home from './pages/home/home';
import MenuItems from './pages/menu-items/menuitems';
import Checkout from './pages/checkout/checkout';
import Loading from './pages/loading/loading';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />}>
          <Route path="outlet" element={<Home />}>
            <Route path="menu-items" element={<MenuItems />} />
          </Route>
          <Route path="order">
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
