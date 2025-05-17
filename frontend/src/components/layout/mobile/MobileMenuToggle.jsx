import React from 'react';

const MobileMenuToggle = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <button
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      aria-controls="mobile-menu"
      aria-expanded={mobileMenuOpen}
      className="rounded-md p-2 text-amber-900 focus-visible:outline-none"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {mobileMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
};

export default MobileMenuToggle;