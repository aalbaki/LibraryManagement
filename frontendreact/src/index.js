import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Front from './Pages/FrontPage/Front.js'
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Login from './Pages/LoginPage/login.js';
import Signup from './Pages/SignupPage/Signup.js';
import Home from './Pages/HomePage/Home.js';
import Collection from './Pages/AddCollectionPage/Collection.js';
import Item from './Pages/AddItemsPage/ItemPage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/collection" element={<Collection/>} />
        <Route path="/additems" element={<Item/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

