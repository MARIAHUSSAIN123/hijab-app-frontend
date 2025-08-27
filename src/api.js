import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ Ensure this matches your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token from localStorage to request headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
