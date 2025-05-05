// src/pages/About.jsx
import React from 'react';
import AboutSidebar from '../components/layout/client/about/AboutSidebar';
import AboutContent from '../components/layout/client/about/AboutContent';

const About = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar - chiếm hết chiều cao */}

        <div className="md:col-span-1 h-full">
          <div className="sticky top-12">
            <AboutSidebar />
          </div>
        </div>

        {/* Nội dung chính - cột bên phải */}
        <div className="md:col-span-2">
          <AboutContent />
        </div>
      </div>
    </div>
  );
};

export default About;