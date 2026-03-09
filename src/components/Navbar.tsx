import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="fixed top-6 right-[1.5vw] z-[100]">
      <div className="nav-pill">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-link-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
