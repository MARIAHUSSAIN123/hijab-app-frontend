import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/card.css';

const HijabCard = ({ style }) => {
  return (
    <Link to={`/hijab/${style._id}`} className="card-link">
      <div className="card">
        <img src={style.imageURL} alt={style.name} />
        <h3>{style.name}</h3>
        <p>{style.description}</p>
      </div>
    </Link>
  );
};

export default HijabCard;