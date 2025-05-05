// TestComponent.jsx
import React, { useEffect } from 'react';

const TestComponent = () => {
  useEffect(() => {
    console.log('Component mounted');

    return () => {
      console.log('Component unmounted');
    };
  }, []);

  return <div>Testing StrictMode</div>;
};

export default TestComponent;