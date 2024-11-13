import React, { useState } from 'react';

const ReviewForm = ({ movieId }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch user ID (assuming it's available in a context)
      const userId = await fetch('/api/auth/user').then((res) => res.json()).then((data) => data.id);
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId, userId, content, rating }),
      });
      if (response.ok) {
        // Handle success (e.g., clear form, update review list)
        console.log('Review submitted successfully!');
      } else {
        // Handle error (e.g., display error message)
        console.error('Error submitting review:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">Review:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating (1-5):</label>
        <select id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;