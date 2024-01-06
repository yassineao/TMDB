import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FilmPoster from '../components/images';
import 'react-awesome-slider/dist/styles.css';
import "../styles/style.css"
import MovieDetails from '../components/genres';

import MoviePoster from '../components/image';


function popularMovies() {
    const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: 'e3436ec42b993f82543c9bdaa01a5e45',
        },
      })
      .then(response => {
        setMovies(response.data.results);
      });
  }, []);


  // Create a ref for the movie_desc element
  const movieDescRef = useRef(null);

  // Function to check if the content is overflowing
  const isOverflowing = (element) => {
    return element.scrollHeight > element.clientHeight;
  };

  // Function to auto-scroll the movie_desc element to the end if it's overflowing
  const autoScrollToEnd = () => {
    if (movieDescRef.current && isOverflowing(movieDescRef.current)) {
      movieDescRef.current.scrollTo({
        top: movieDescRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // Call the autoScrollToEnd function whenever the item prop changes or when querying new movies
  useEffect(() => {
    autoScrollToEnd();
  }, [movies]);









  return (                  <div>
                            <h1 class="titles">Popular movies </h1>
                          <div class="card">

                            {movies.map(movie => (



                              <div class="movie_card" id="bright" key={movie.id} >
                                                          <div class="info_section">
                                                            <div class="movie_header">

                                                              <MoviePoster  movieId={movie.id} />
                                                              <h1>{movie.title} </h1>
                                                              <h3>.</h3>
                                                              <span class="minutes">{movie.vote_average} </span>
                                                              <p class="type">{movie.release_date},  {movie.original_language}</p>
                                                              <h1>{movie.genres}</h1>
                                                            </div>
                                                            <div class="movie_desc">
                                                              <p class="text">
                                                                {movie.overview}
                                                              </p>
                                                            </div>

                                                          </div>
                                                          <div class="blur_back"><MoviePoster  movieId={movie.id} /></div>
                                                        </div>

                            ))}

                           </div>
                           </div>
  );
}

export default popularMovies;