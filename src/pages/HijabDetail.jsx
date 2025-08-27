import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import ReviewForm from '../components/ReviewForm';
import '../styles/hijabDetail.css';

const HijabDetail = () => {
  const { id } = useParams();
  const [style, setStyle] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [popup, setPopup] = useState('');

  // Fetch hijab style + reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const styleRes = await API.get(`/hijabs/${id}`);
        setStyle(styleRes.data);

        const reviewsRes = await API.get(`/reviews/${id}`);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  // Calculate average rating
  const avgRating =
    reviews.length
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  // Callback after new review is added
  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setPopup('Review submitted successfully!');
    setTimeout(() => setPopup(''), 2000);
  };

  if (!style) return <div>Loading...</div>;

  return (
    <div className="hijab-detail-container">
      <h2>{style.name}</h2>
      <img src={style.imageURL} alt={style.name} className="detail-image" />
      <p>{style.description}</p>

      <div className="rating">
        Average Rating:{' '}
        {avgRating ? (
          <>
            <strong>{avgRating}</strong> / 5{' '}
            <span className="stars">
              {'★'.repeat(Math.round(avgRating)) + '☆'.repeat(5 - Math.round(avgRating))}
            </span>
          </>
        ) : (
          'No reviews yet'
        )}
      </div>

      <ReviewForm hijabId={id} onReviewAdded={handleReviewAdded} />

      <h3>Reviews</h3>
      <div className="reviews-list">
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((rev) => (
          <div key={rev._id} className="review-card">
            <p><strong>{rev.userEmail}</strong> rated {rev.rating} / 5</p>
            <p>{rev.text}</p>
          </div>
        ))}
      </div>

      {popup && <div className="popup">{popup}</div>}
    </div>
  );
};

export default HijabDetail;