import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';
import ReviewForm from './ReviewForm';
import UserReviews from './UserReviews';
import './components.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useAuthContext();

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`/api/movies/${id}`);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews/${id}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (movie) {
      fetchReviews();
    }
  }, [movie]);

  return (
    <div className="movie-details">
      {movie && (
        <>
          <h2>{movie.title}</h2>
          <img src={movie.poster_url} alt={movie.title} />
          <p>{movie.description}</p>
          <p>Genre: {movie.genre}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Average Rating: {movie.average_rating}</p>
          <h3>Reviews</h3>
          {currentUser ? (
            <ReviewForm movieId={movie.id} />
          ) : (
            <p>Please login to write a review.</p>
          )}
          <UserReviews reviews={reviews} />
        </>
      )}
    </div>
  );
};

export default MovieDetails;