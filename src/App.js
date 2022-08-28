import './App.css';
import Error404 from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import Home from './pages/home/home';
import MenuItems from './pages/menu-items/menuitems';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={ <Home />}>
        <Route path="menu-items" element={<MenuItems />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
