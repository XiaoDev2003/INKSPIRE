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
import Register from './pages/Auth/Register';
import Category from './pages/Category';
import Test from './pages/Test';


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

      {/* Category Routers */}
      <Route path='/category' element={<Category />} />
      <Route path='/category/traditional' element={<Category />} />
      <Route path='/category/modern' element={<Category />} />
      <Route path='/category/handwriting' element={<Category />} />

      {/* Calligraphy Routers */}
      <Route path='/calligraphy/traditional' element={<Calligraphy />} />
      <Route path='/calligraphy/modern' element={<Calligraphy />} />

      {/* Auth Routers */}
      <Route path='/auth/login' element={<Login />}/>
      <Route path='/auth/register' element={<Register />}/>

      <Route path='/test' element={<Test />}/>
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default MainRouter