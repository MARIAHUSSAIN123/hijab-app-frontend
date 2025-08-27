// src/components/ReviewForm.jsx
import React, { useState } from 'react';
import API from '../api';
import '../styles/reviewForm.css';

const ReviewForm = ({ hijabId, onReviewAdded }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [popup, setPopup] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setPopup('You must be logged in to submit a review.');
      setTimeout(() => setPopup(''), 2000);
      return;
    }
    try {
      // ✅ correct endpoint
      const res = await API.post(`/reviews/${hijabId}`, { text, rating });
      onReviewAdded(res.data);
      setText('');
      setRating(5);
    } catch (err) {
      setPopup(err.response?.data?.msg || 'Failed to submit review.');
      setTimeout(() => setPopup(''), 2000);
    }
  };

  return (
    <div className="review-form-container">
      <h3>Add a Review</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={4}
        ></textarea>
        <label>
          Rating:{' '}
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit Review</button>
      </form>
      {popup && <div className="popup">{popup}</div>}
    </div>
  );
};

export default ReviewForm;
