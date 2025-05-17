import React from 'react';

const TabNav = ({ tabs = [], active = 0, onChange }) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 font-medium transition-colors duration-200 ${
            active === index
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onChange(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNav;