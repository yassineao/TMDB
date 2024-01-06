import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetails = ({ movieId }) => {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const apiKey = 'e3436ec42b993f82543c9bdaa01a5e45'; // Replace with your actual API key
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;

    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get(movieUrl);
        setMovie(movieResponse.data);

        const genresResponse = await axios.get(genresUrl);
        setGenres(genresResponse.data.genres);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);


  const getMovieGenres = () => {
      if (movie.genre_ids && genres.length > 0) {
        const movieGenres = genres.filter(genre => movie.genre_ids.includes(genre.id));
        return movieGenres.map(genre => genre.name).slice(0, 3).join(', ');
      }
      return '';
    };


  return (
      <p class="type">{getMovieGenres()}</p>
  );
};

export default MovieDetails;
