import React, { useState } from 'react';
import "../styles/style.css"
import Cover from './Cover';

function Movie({ movie }) {
  const [isAdded, setIsAdded] = useState(false);

  const addToFavorites = () => {
    // Here you can implement the logic to add the movie ID to the user's favoriteFilms array
    // For now, let's just toggle the isAdded state
    setIsAdded(!isAdded);
  };

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
              <h1>{movie.genres}</h1>
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
