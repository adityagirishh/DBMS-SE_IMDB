// utils/mlShuffle.js
const userClicks = { // Example user clicks
    1: [1, 3, 5, 7],
    2: [2, 4, 6],
    3: [1, 2, 5],
  };
  
  const movies = [
    { id: 1, title: "Movie 1" },
    { id: 2, title: "Movie 2" },
    { id: 3, title: "Movie 3" },
    { id: 4, title: "Movie 4" },
    { id: 5, title: "Movie 5" },
    { id: 6, title: "Movie 6" },
    { id: 7, title: "Movie 7" },
  ];
  
  export const shuffleMoviesBasedOnUserClicks = (userId) => {
    const currentUserClicks = userClicks[userId]; // Get current user's clicks
  
    // Calculate similarities with other users
    const userSimilarities = {};
    for (const otherUserId in userClicks) {
      if (otherUserId !== userId) {
        userSimilarities[otherUserId] = jaccardSimilarity(
          currentUserClicks,
          userClicks[otherUserId]
        );
      }
    }
  
    // Create a map of movies to their similarity scores
    const movieScores = {};
    for (const movieId of currentUserClicks) {
      movieScores[movieId] = 0; // Initialize scores
    }
  
    // Calculate movie scores based on similar users
    for (const otherUserId in userSimilarities) {
      if (userSimilarities[otherUserId] > 0.5) { // Adjust threshold as needed
        for (const movieId of userClicks[otherUserId]) {
          if (movieId in movieScores) {
            movieScores[movieId] += userSimilarities[otherUserId];
          }
        }
      }
    }
  
    // Sort movies by their scores (highest score first)
    const sortedMovies = movies.sort((a, b) => {
      return movieScores[b.id] - movieScores[a.id];
    });
  
    return sortedMovies;
  };
  
  // Helper function (from previous code)
  function jaccardSimilarity(set1, set2) {
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  }
  
  // src/services/db.js
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