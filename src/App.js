import './App.css';
import Counters from './pages/counters'
import Error404 from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react';
import Home from './pages/home';
import MenuItems from './pages/menuitems';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={ <Home />}>
          <Route path="hello" element={<Counters />} />
        </Route>
        <Route path="menu-items" element={<MenuItems />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
