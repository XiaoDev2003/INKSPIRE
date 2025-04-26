// 📁 src/components/Header.jsx
import React from 'react';
import Menu from './Menu';
import VisitorCounter from './VisitorCounter';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">Scratchy Nib</div>
      <VisitorCounter />
      <Menu />
    </header>
  );
}