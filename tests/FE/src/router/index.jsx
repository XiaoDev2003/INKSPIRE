// 📁 src/router/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Categories from '../pages/Categories';
import About from '../pages/About';
import Feedback from '../pages/Feedback';
import Queries from '../pages/Queries';
import Contact from '../pages/Contact';
import SiteMap from '../pages/SiteMap';
import ItemDetail from '../pages/ItemDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/about" element={<About />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/queries" element={<Queries />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/sitemap" element={<SiteMap />} />
      <Route path="/item/:id" element={<ItemDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}