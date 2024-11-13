const { pool } = require('../index');  // Assuming pool is initialized in index.js

class Review {
  // Create a new review
  static async createReview(movieId, userId, content, rating) {
    try {
      const result = await pool.query(
        'INSERT INTO reviews (movie_id, user_id, content, rating) VALUES ($1, $2, $3, $4) RETURNING *',
        [movieId, userId, content, rating]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error creating review: ${err.message}`);
    }
  }

  // Get all reviews for a specific movie
  static async getReviewsByMovieId(movieId) {
    try {
      const result = await pool.query('SELECT * FROM reviews WHERE movie_id = $1', [movieId]);
      return result.rows;
    } catch (err) {
      throw new Error(`Error fetching reviews by movie ID: ${err.message}`);
    }
  }

  // Get all reviews by a specific user
  static async getReviewsByUserId(userId) {
    try {
      const result = await pool.query('SELECT * FROM reviews WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (err) {
      throw new Error(`Error fetching reviews by user ID: ${err.message}`);
    }
  }

  // Update a review by ID
  static async updateReview(reviewId, content, rating) {
    try {
      const result = await pool.query(
        'UPDATE reviews SET content = $1, rating = $2 WHERE id = $3 RETURNING *',
        [content, rating, reviewId]
      );
      if (result.rows.length === 0) {
        throw new Error('Review not found');
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error updating review: ${err.message}`);
    }
  }

  // Delete a review by ID
  static async deleteReview(reviewId) {
    try {
      const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [reviewId]);
      if (result.rows.length === 0) {
        throw new Error('Review not found');
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error deleting review: ${err.message}`);
    }
  }
}

module.exports = Review;
