
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="text-white no-underline">Home</Link>
        </li>
        <li>
          <Link to="/login" className="text-white no-underline">Login</Link>
        </li>
        <li>
          <Link to="/register" className="text-white no-underline">Register</Link>
        </li>
        <li>
          <Link to="/modify" className="text-white no-underline">Modify</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
