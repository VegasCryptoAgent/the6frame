import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <>
      <div className="fixed top-10 right-10 z-[100]">
        <div className="nav-pill">
          {[
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '#' }
          ].map(item => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`nav-link-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
