// src/components/BoxCount.jsx
import React from 'react';
import CountUp from 'react-countup';

const BoxCount = ({ count, title }) => {
  return (
    <div className="bg-gray-100 bg-opacity-60 p-6 rounded-lg shadow-md text-center mx-2">
      <CountUp
        start={0}
        end={count}
        duration={2}
        separator=","
        decimals={0}
        className="text-4xl font-bold text-amber-900 mb-2"
      />
      <p className="text-gray-700">{title}</p>
    </div>
  );
};

export default BoxCount;