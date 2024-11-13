import { getMovies, getMovieById, addMovie, updateMovie, deleteMovie } from './db';

// Fetch all movies from the database
export const fetchAllMovies = async () => {
  try {
    const movies = await getMovies(); // Use your database interaction function
    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Fetch a specific movie by its ID
export const fetchMovieById = async (id) => {
  try {
    const movie = await getMovieById(id); // Fetch movie by ID from the database
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  } catch (error) {
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};

// Add a new movie to the database
export const createMovie = async (movieData) => {
  try {
    const newMovie = await addMovie(movieData); // Add a new movie
    return newMovie;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
};

// Update movie details by its ID
export const modifyMovie = async (id, updatedData) => {
  try {
    const updatedMovie = await updateMovie(id, updatedData); // Update movie details
    if (!updatedMovie) {
      throw new Error('Movie not found for update');
    }
    return updatedMovie;
  } catch (error) {
    console.error(`Error updating movie with id ${id}:`, error);
    throw error;
  }
};

// Delete a movie by its ID
export const removeMovie = async (id) => {
  try {
    const result = await deleteMovie(id); // Delete movie by ID
    if (!result) {
      throw new Error('Movie not found for deletion');
    }
    return { message: 'Movie deleted successfully' };
  } catch (error) {
    console.error(`Error deleting movie with id ${id}:`, error);
    throw error;
  }
};
