// 📁 src/pages/Contact.jsx
import React, { useState } from 'react';

export default function Contact() {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send contact form somewhere or mock submit
    console.log(contact);
    setSent(true);
  };

  return (
    <section>
      <h2>Contact Us</h2>
      {sent ? <p>Your message has been sent!</p> : (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Your Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <textarea name="message" placeholder="Your message..." onChange={handleChange} required />
          <button type="submit">Send</button>
        </form>
      )}
    </section>
  );
}