import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setPopup('Login Successful!');
      setTimeout(() => {
        setPopup('');
        navigate('/');
      }, 1500);
    } catch (err) {
      setPopup(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {popup && <div className="popup">{popup}</div>}
    </div>
  );
};

export default Login;