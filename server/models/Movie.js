const { pool } = require('../index');  // Assuming pool is initialized in index.js

class Movie {
  // Get all movies
  static async getAllMovies() {
    try {
      const result = await pool.query('SELECT * FROM movies');
      return result.rows;
    } catch (err) {
      throw new Error(`Error fetching all movies: ${err.message}`);
    }
  }

  // Get movie by ID
  static async getMovieById(movieId) {
    try {
      const result = await pool.query('SELECT * FROM movies WHERE id = $1', [movieId]);
      if (result.rows.length === 0) {
        throw new Error('Movie not found');
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error fetching movie by ID: ${err.message}`);
    }
  }

  // Create a new movie
  static async createMovie(movieData) {
    const { title, description, genre, release_date, poster_url } = movieData;
    try {
      const result = await pool.query(
        'INSERT INTO movies (title, description, genre, release_date, poster_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, description, genre, release_date, poster_url]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error creating movie: ${err.message}`);
    }
  }

  // Update an existing movie by ID
  static async updateMovie(movieId, movieData) {
    const { title, description, genre, release_date, poster_url } = movieData;
    try {
      const result = await pool.query(
        'UPDATE movies SET title = $1, description = $2, genre = $3, release_date = $4, poster_url = $5 WHERE id = $6 RETURNING *',
        [title, description, genre, release_date, poster_url, movieId]
      );
      if (result.rows.length === 0) {
        throw new Error('Movie not found');
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error updating movie: ${err.message}`);
    }
  }

  // Delete a movie by ID
  static async deleteMovie(movieId) {
    try {
      const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [movieId]);
      if (result.rows.length === 0) {
        throw new Error('Movie not found');
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error deleting movie: ${err.message}`);
    }
  }
}

module.exports = Movie;
