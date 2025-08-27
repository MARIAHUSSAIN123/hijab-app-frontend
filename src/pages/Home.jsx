import React, { useEffect, useState } from 'react';
import API from '../api';
import HijabCard from '../components/HijabCard';
import '../styles/home.css';

const Home = () => {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const res = await API.get('/hijabs');
        setStyles(res.data);
      } catch (err) {
        console.error('Failed to fetch hijab styles', err);
      }
    };

    fetchStyles();
  }, []);

  return (
    <div className="home-container">
      <h1>Hijab Styles</h1>
      <div className="grid">
        {styles.map((style) => (
          <HijabCard key={style._id} style={style} />
        ))}
      </div>
    </div>
  );
};

export default Home;