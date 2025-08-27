import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import '../styles/navbar.css';

const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUserEmail(decoded.email);
      } catch {
        setUserEmail(null);
      }
    } else {
      setUserEmail(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserEmail(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">HijabReview</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        {!userEmail && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
        {userEmail && (
          <>
            <span className="user-email">{userEmail}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;