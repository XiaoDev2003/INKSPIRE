// 📁 src/pages/Feedback.jsx
import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Feedback() {
  const [formData, setFormData] = useState({ user_id: '', item_id: '', content: '' });
  const [submitted, setSubmitted] = useState(false);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient.post('/api/feedback/create.php', formData)
      .then(() => setSubmitted(true))
      .catch(err => console.error('Submit error:', err));
  };

  return (
    <section>
      <h2>Feedback</h2>
      {submitted ? <p>Thank you for your feedback!</p> : (
        <form onSubmit={handleSubmit}>
          <input name="user_id" placeholder="Your User ID" onChange={handleChange} required />
          <input name="item_id" placeholder="Item ID" onChange={handleChange} required />
          <textarea name="content" placeholder="Your feedback..." onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      )}
    </section>
  );
}