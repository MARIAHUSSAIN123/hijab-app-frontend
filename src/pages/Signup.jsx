import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token);
      setPopup('Signup Successful!');
      setTimeout(() => {
        setPopup('');
        navigate('/');
      }, 1500);
    } catch (err) {
      setPopup(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
      {popup && <div className="popup">{popup}</div>}
    </div>
  );
};

export default Signup;