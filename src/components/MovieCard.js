import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img src={movie.poster_url} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>Rating: {movie.average_rating}</p>
    </Link>
  );
};

export default MovieCard;