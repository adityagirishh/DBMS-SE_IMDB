import axios from 'axios';

// Replace with your actual database credentials from .env file
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Use env variable for API URL

// --- MOVIE FUNCTIONS ---

// Function to get all movies from the API
export const getMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/movies`);
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in getMovies:', error);
    throw error; 
  }
};

// Function to get a movie by ID
export const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/movies/${movieId}`);
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error(`Error fetching movie: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in getMovieById:', error);
    throw error;
  }
};

// Function to create a new movie
export const createMovie = async (movieData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/movies`, movieData);
    if (response.status === 201) { 
      return response.data;
    } else {
      throw new Error(`Error creating movie: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in createMovie:', error);
    throw error;
  }
};

// Function to update a movie
export const updateMovie = async (movieId, movieData) => {
  try {
    const response = await axios.put(`${apiUrl}/api/movies/${movieId}`, movieData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error updating movie: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in updateMovie:', error);
    throw error;
  }
};

// Function to delete a movie
export const deleteMovie = async (movieId) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/movies/${movieId}`);
    if (response.status === 204) { 
      return true; 
    } else {
      throw new Error(`Error deleting movie: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in deleteMovie:', error);
    throw error;
  }
};

// --- USER FUNCTIONS ---

// Function to get a user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/users/${userId}`);
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error;
  }
};

// Function to create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/users`, userData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Error creating user: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

// Function to update a user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${apiUrl}/api/users/${userId}`, userData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error updating user: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

// Function to delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/users/${userId}`);
    if (response.status === 204) { 
      return true; 
    } else {
      throw new Error(`Error deleting user: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
};

// --- REVIEW FUNCTIONS ---

// Function to get reviews by movie ID
export const getReviewsByMovieId = async (movieId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/reviews/${movieId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching reviews: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in getReviewsByMovieId:', error);
    throw error;
  }
};

// Function to get reviews by user ID
export const getReviewsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/api/reviews/user/${userId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error fetching reviews: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in getReviewsByUserId:', error);
    throw error;
  }
};

// Function to create a new review
export const createReview = async (reviewData) => {
  try {
    const response = await axios.post(`${apiUrl}/api/reviews`, reviewData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Error creating review: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in createReview:', error);
    throw error;
  }
};

// Function to update a review
export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await axios.put(`${apiUrl}/api/reviews/${reviewId}`, reviewData);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error updating review: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in updateReview:', error);
    throw error;
  }
};

// Function to delete a review
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${apiUrl}/api/reviews/${reviewId}`);
    if (response.status === 204) { 
      return true; 
    } else {
      throw new Error(`Error deleting review: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in deleteReview:', error);
    throw error;
  }
};