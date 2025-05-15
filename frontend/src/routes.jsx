import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import NotFound from './pages/Error/NotFound'
import About from './pages/About';
import FAQ from './pages/FAQ';
import React from 'react'
import Gallery from './pages/Gallery';
import Feedback from './pages/Feedback';
import Calligraphy from './pages/Calligraphy';
import Category from './pages/Category';
import Test from './pages/Test';
import ProtectedRoute from './components/common/ProtectedRoute';

// Admin pages
import Dashboard from './pages/Admin/Dashboard';
import Users from './pages/Admin/Users';
import Categories from './pages/Admin/Categories';
import Items from './pages/Admin/Items';
import AdminGallery from './pages/Admin/Gallery';
import Comments from './pages/Admin/Comments';
import AdminFeedback from './pages/Admin/Feedback';
import AdminFAQ from './pages/Admin/FAQ';


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

      {/* Calligraphy Routers */}
      <Route path='/category/:type' element={<Category />} />
      <Route path='/category/:type/:itemId' element={<Category />} />



      {/* Admin Routes - Được bảo vệ bởi ProtectedRoute */}
      <Route path='/admin' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/admin/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path='/admin/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
      <Route path='/admin/items' element={<ProtectedRoute><Items /></ProtectedRoute>} />
      <Route path='/admin/gallery' element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
      <Route path='/admin/comments' element={<ProtectedRoute><Comments /></ProtectedRoute>} />
      <Route path='/admin/feedback' element={<ProtectedRoute><AdminFeedback /></ProtectedRoute>} />
      <Route path='/admin/faq' element={<ProtectedRoute><AdminFAQ /></ProtectedRoute>} />
      <Route path='/admin/statistics' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      <Route path='/test' element={<Test />}/>
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default MainRouter