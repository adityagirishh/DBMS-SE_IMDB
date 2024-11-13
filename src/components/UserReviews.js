import React from 'react';

const UserReviews = ({ reviews }) => {
  return (
    <div className="user-reviews">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
            <p>Timestamp: {new Date(review.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default UserReviews;