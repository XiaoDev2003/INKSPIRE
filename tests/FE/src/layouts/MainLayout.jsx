// 📁 src/layouts/MainLayout.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppRouter from '../router';
import VisitorCounter from '../components/VisitorCounter';
import Ticker from '../components/Ticker';

export default function MainLayout() {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-content">
        <AppRouter />
      </main>
      <Footer />
      <Ticker />
    </div>
  );
}