import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import movieService from '../services/movieService';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await movieService.getMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Hero movie={movies[0]} />
      <MovieRow title="Trending Now" movies={movies} />
      <MovieRow title="Top Rated" movies={movies} />
      <MovieRow title="Action Movies" movies={movies.filter(movie => movie.genre === 'Action')} />
    </>
  );
};

export default HomePage;
