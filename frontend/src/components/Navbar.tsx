import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <Link to='/' className='navbar-brand'>
        Home
      </Link>
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link to='/upload' className='nav-link'>
            Upload
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/stats' className='nav-link'>
            Stats
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/graph' className='nav-link'>
            Graph
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;