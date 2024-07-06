
import React, { useEffect, useState } from 'react';

import GlitchingButton from '../components/glitchingButton';
import Genre from '../components/genre';
export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genreId, setGenreId] = useState(null); // Initialize genreId to null
  const [showPopup, setShowPopup] = useState(false);
  const [searchType, setSearchType] = useState('movie');
  const handleTogglePopup = (id) => {
    setGenreId(id);
    setShowPopup((prev) => !prev);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${searchType}/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
        );
        console.log(searchType);
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
  }, [searchType]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div >     
      <div id='uni'>       
      <GlitchingButton handleClick={() => setSearchType(searchType === 'movie' ? 'tv' : 'movie')} name={searchType} aria={true} />
      </div>    
     <div id='genre'>
          {genres.map(genre => (
            <Genre 
              key={genre.id}
              genreId={genre.id}
              name={genre.name}
              handleTogglePopup={handleTogglePopup}
              showPopup={showPopup && genreId === genre.id}
              type={searchType}
            />
          ))}
        </div>
    </div>
  );
}