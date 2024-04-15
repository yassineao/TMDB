import React from 'react';
import "../styles/style.css"
import Cover from './Cover';

function Movie({  movie }) { // Receive props as a single object argument

  return (
    <div>
      <div className="card">
        <div className="movie_card" id="bright" key={movie.id}>
          <div className="info_section">
            <div className="movie_header">
              <Cover Type="movie" Id={movie.id} number={3} />
              <h1>{movie.title}</h1>
              <h3>.</h3>
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
