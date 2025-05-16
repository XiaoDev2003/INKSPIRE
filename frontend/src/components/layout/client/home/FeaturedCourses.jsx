// src/components/layout/client/calligraphy/FeaturedCourses.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../ui/ui';

const CourseCard = ({ title, description, image, level, duration, link }) => {
  return (
    <Card className="h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-lg mb-4 h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
          {level}
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          <i className="fa-regular fa-clock mr-1"></i> {duration}
        </span>

        <Link
          to={link}
          className="text-amber-600 hover:text-amber-800 font-medium text-sm inline-flex items-center"
        >
          Xem chi tiết
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </Card>
  );
};

const FeaturedCourses = () => {
  // Dữ liệu mẫu cho các khóa học nổi bật
  const courses = [
    {
      id: 1,
      title: "Thư pháp cơ bản",
      description: "Khóa học dành cho người mới bắt đầu, giúp bạn làm quen với nghệ thuật viết chữ thư pháp",
      image: "https://images.unsplash.com/photo-1596611479435-f171e4e88e17?q=80&w=1974&auto=format&fit=crop",
      level: "Cơ bản",
      duration: "4 tuần",
      link: "/courses/basic-calligraphy"
    },
    {
      id: 2,
      title: "Thư pháp chữ Hán",
      description: "Tìm hiểu về nghệ thuật viết chữ Hán truyền thống và các phong cách khác nhau",
      image: "https://images.unsplash.com/photo-1617178388553-a9d22e36d849?q=80&w=1974&auto=format&fit=crop",
      level: "Trung cấp",
      duration: "6 tuần",
      link: "/courses/chinese-calligraphy"
    },
    {
      id: 3,
      title: "Thư pháp hiện đại",
      description: "Khám phá các kỹ thuật thư pháp hiện đại và cách kết hợp với nghệ thuật đương đại",
      image: "https://images.unsplash.com/photo-1455885661740-29cbf08a42fa?q=80&w=1974&auto=format&fit=crop",
      level: "Nâng cao",
      duration: "8 tuần",
      link: "/courses/modern-calligraphy"
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Khóa học nổi bật</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá các khóa học thư pháp được thiết kế cho mọi trình độ, từ người mới bắt đầu đến những người đã có kinh nghiệm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              image={course.image}
              level={course.level}
              duration={course.duration}
              link={course.link}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium rounded-md transition-colors duration-300"
          >
            Xem tất cả khóa học
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;