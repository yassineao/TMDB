import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGenres } from '../api/fetchGenres';
import Genre from '../components/genre';
export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=831a4bb8a39f71fea9d3c2efe8fb5ab2&language=en-US'
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