import React, { useState, useEffect } from 'react';
import "../styles/style.css";
import Cover from './Cover';
import getToken from '../api/getTokenU';
import updateFavoriteFilm from '../api/updateFavoriteFilm';

function Movie({ movie }) {
  const [userDataFetched, setUserDataFetched] = useState(false); // Track if user data has been fetched

  const [isAdded, setIsAdded] = useState(false);
  const [filmId, setFilmId] = useState('');
  const [userData, setUserData] = useState(null); 
  const handleAddFavoriteFilm = async (type, filmId) => {
    try {
      
      const response = await updateFavoriteFilm(type, filmId);
      
      if (response.ok) {
        const data = await response.json();
        console.log('User updated with new favorite films:', data);
        // Optionally, you can update the UI or show a success message here
      } else {
        const errorData = await response.json();
        console.error('Failed to update favorite films:', errorData.message);
        // Optionally, you can handle the error here, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error updating favorite films:', error);
      // Optionally, you can handle unexpected errors here
    }
  };

  const addToFavorites = () => {
    setIsAdded(!isAdded);
    setFilmId(movie.id);
    const type = isAdded ? "pull" : "addToSet";
    
    if (isAdded) {
      console.log('Remove from favorites:', movie.title);
    } else {
      console.log('Add to favorites:', movie.title);
    }
    
    handleAddFavoriteFilm(type, movie.id);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the getToken function to fetch user data only if it hasn't been fetched before
        if (!userDataFetched) {
          const user = await getToken();
          setUserData(user); // Set user data to state
          setUserDataFetched(true); // Update the state to indicate that user data has been fetched
   
          const numberExists = user.favoriteFilms.includes(movie.id);

          if (numberExists) {
            setIsAdded(true); // Set isAdded to true if movie is already in favorites
          } 
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [userDataFetched]);
  return (
    <div>
      <div className="card">
        <div className="movie_card" id="bright" key={movie.id}>
          <div className="info_section">
            <div className="movie_header">
              <Cover Type="movie" Id={movie.id} number={3} />
              <h1>{movie.title}</h1>
              <button className="smallButton" onClick={addToFavorites}>
                {isAdded ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <span className="minutes">{movie.vote_average}</span>
              <p className="type">{movie.release_date}, {movie.original_language}</p>
            </div>
            <div className="movie_desc">
              <p className="text">{movie.overview}</p>
            </div>
          </div>
          <div className="blur_back"><Cover Type="movie" Id={movie.id} number={1} /></div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
