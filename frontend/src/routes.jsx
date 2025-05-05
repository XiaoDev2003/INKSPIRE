import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import NotFound from './pages/Error/NotFound'
import About from './pages/About';
import FAQ from './pages/FAQ';
import React from 'react'
import Gallery from './pages/Gallery';
import Feedback from './pages/Feedback';
import Calligraphy from './pages/Calligraphy';


const MainRouter = () => {
  return (
    <Routes>
      {/* Main Routers */}
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/calligraphy' element={<Calligraphy />} />
      <Route path='/feedbackandquestion' element={<FAQ />} />
      <Route path='/feedback' element={<Feedback />} />

      {/* Auth Routers */}
      <Route path='/auth/login' element={<Login />}/>

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default MainRouter