// Fetch all reviews for a movie by its ID
export const fetchReviewsByMovieId = async (movieId) => {
    try {
      const response = await fetch(`/api/reviews/${movieId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching reviews by movie ID:', error);
      throw error;
    }
  };
  
  // Fetch a single review by its ID
  export const fetchReviewById = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/review/${reviewId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch review');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching review:', error);
      throw error;
    }
  };
  
  // Create a new review for a movie
  export const createReview = async (movieId, reviewData) => {
    try {
      const response = await fetch(`/api/reviews/${movieId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
        throw new Error('Failed to create review');
      }
      const newReview = await response.json();
      return newReview;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  };
  
  // Update an existing review by its ID
  export const updateReview = async (reviewId, updatedReviewData) => {
    try {
      const response = await fetch(`/api/reviews/review/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReviewData),
      });
      if (!response.ok) {
        throw new Error('Failed to update review');
      }
      const updatedReview = await response.json();
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error);
      throw error;
    }
  };
  
  // Delete a review by its ID
  export const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/review/${reviewId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      return { message: 'Review deleted successfully' };
    } catch (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  };
  