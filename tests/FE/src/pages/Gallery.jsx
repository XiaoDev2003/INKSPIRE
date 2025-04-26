// 📁 src/pages/Gallery.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axiosClient.get('/api/gallery')
      .then(res => setImages(res.data))
      .catch(err => console.error('Gallery fetch error:', err));
  }, []);

  const filteredImages = filter
    ? images.filter(img => img.script_type === filter)
    : images;

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Calligraphy Gallery</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Script Type:</label>
        <select className="border p-1 rounded" onChange={(e) => setFilter(e.target.value)}>
          <option value=''>All</option>
          <option value='Arabic'>Arabic</option>
          <option value='Indian'>Indian</option>
          <option value='Greek'>Greek</option>
          <option value='Other'>Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.map(image => (
          <div key={image.gallery_id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <Link to={`/item/${image.item_id}`}>
              <img src={image.image_url} alt={image.title} className="w-full h-48 object-cover" />
            </Link>
            <div className="p-4">
              <h4 className="text-lg font-semibold">{image.title}</h4>
              <p className="text-sm text-gray-600">{image.item_description}</p>
              <div className="mt-2 text-sm">
                <span className="text-gray-700"><strong>Style:</strong> {image.script_type}</span><br />
                <span className="text-gray-700"><strong>Author:</strong> {image.author_name || 'Unknown'}</span>
              </div>
              <Link to={`/item/${image.item_id}`} className="inline-block mt-3 text-blue-600 hover:underline text-sm">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
