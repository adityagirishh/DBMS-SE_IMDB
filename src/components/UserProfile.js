import React, { useState, useEffect } from 'react';
import { useAuthContext } from './AuthProvider';
import { Link } from 'react-router-dom';
import './components.css';

const UserProfile = () => {
  const { currentUser } = useAuthContext();
  const [userReviews, setUserReviews] = useState([]);

  const fetchUserReviews = async () => {
    try {
      const response = await fetch(`/api/reviews/user/${currentUser.id}`);
      if (response.ok) {
        const data = await response.json();
        setUserReviews(data);
      }
    } catch (error) {
      console.error('Error fetching user reviews:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserReviews();
    }
  }, [currentUser]);

  return (
    <div className="user-profile">
      <h2>Profile</h2>
      <h3>Username: {currentUser.username}</h3>
      <h3>Email: {currentUser.email}</h3>
      <h3>Reviews:</h3>
      {userReviews.length > 0 ? (
        userReviews.map((review) => (
          <div key={review.id} className="review">
            <p>Movie: <Link to={`/movie/${review.movie_id}`}>{review.title}</Link></p>
            <p>Rating: {review.rating}</p>
            <p>Content: {review.content}</p>
            <p>Timestamp: {new Date(review.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default UserProfile;