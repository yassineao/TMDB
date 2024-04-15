import React, { useState, useEffect } from 'react';
import "../styles/style.css"
import { getMovies } from '../api/getMovies';
import Cover from './Cover';
import Movie from './Movie';

function Movies() {
 

  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const data = await getMovies();
      
      setMovies(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Movies:', error);
    }
  };








  // Function to check if the content is overflowing
  const isOverflowing = (element) => {
    return element.scrollHeight > element.clientHeight;
  };

  // Function to auto-scroll the movie_desc element to the end if it's overflowing
 
  useEffect(() => {
    fetchMovies();
  }, []);
  






  return (
    <div>
    <div className="card">
      {loading ? (
        <p>Loading...</p>
      ) : (
        movies.results.slice(0, 20).map(movie => ( // Use slice(0, 20) to get only the first 20 movies
        <Movie  movie={movie} />
        ))
      )}
    </div>
  </div>
  
  );
}

export default Movies;