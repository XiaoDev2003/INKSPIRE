// 📁 src/pages/Queries.jsx
import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Queries() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    axiosClient.get('/api/queries/read.php')
      .then(res => setQueries(res.data))
      .catch(err => console.error('Queries fetch error:', err));
  }, []);

  return (
    <section>
      <h2>FAQs</h2>
      <ul>
        {queries.map(q => (
          <li key={q.query_id}>
            <strong>{q.question}</strong>
            <p>{q.short_answer}</p>
            <a href={q.answer_url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </section>
  );
}