// 📁 src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosClient.get('/api/category')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Categories fetch error:', err));
  }, []);

  return (
    <section>
      <h2>Calligraphy Styles</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.category_id}>
            <strong>{cat.category_name}</strong>: {cat.category_type}<br />
            <em>{cat.category_description}</em>
          </li>
        ))}
      </ul>
    </section>
  );
}