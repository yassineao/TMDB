import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Genre from '../components/genre';
export default function Hwome() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

    return (
      <div id='genre'>
      {genres.map(genre => (
               <Genre name={genre.name}/>
              ))}

      </div>
     
  
  );
}