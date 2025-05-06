// src/components/ui/Button/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, href, onClick, variant = 'primary', size = 'md', className = '', children }) => {
  const base = 'inline-flex items-center font-medium rounded transition-colors duration-200 focus:outline-none';

  const variants = {
    primary: 'bg-amber-600 text-white hover:bg-amber-700',
    secondary: 'bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-50',
    link: 'text-amber-600 hover:text-amber-800 underline',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;