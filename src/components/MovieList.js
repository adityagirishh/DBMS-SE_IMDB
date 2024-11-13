import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import { useAuthContext } from './AuthProvider';
import './components.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuthContext();

  // Fetch movies from API
  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // **ML Shuffle Logic (Simplified)** 
  useEffect(() => {
    if (currentUser) {
      // Replace with your actual ML logic
      const shuffledMovies = shuffleMoviesBasedOnUserClicks(currentUser.id);
      setMovies(shuffledMovies);
    }
  }, [currentUser]);

  const shuffleMoviesBasedOnUserClicks = (userId) => {
    // ... Implement ML logic here ...
    // (For now, just shuffling randomly for demonstration)
    return [...movies].sort(() => 0.5 - Math.random());
  };

  return (
    <div className="movie-list">
      <h2>Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;