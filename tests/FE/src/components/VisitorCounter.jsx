import React, { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState(() => {
    const stored = localStorage.getItem('visitorCount');
    return stored ? parseInt(stored, 10) : 1;
  });

  useEffect(() => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('visitorCount', newCount);
  }, []);

  return (
    <div className="visitor-counter">
      👁 Visitors: {count}
    </div>
  );
}
