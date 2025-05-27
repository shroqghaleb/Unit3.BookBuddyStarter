/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navigations() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  
  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <nav className="nav-container">
      <div className="nav-links">
        <Link to="/books" className="nav-link">Books</Link>
      </div>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/account" className="nav-link">Account</Link>
            <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigations;