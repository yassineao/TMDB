import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlitchingButton from './glitchingButton';
import Cover from './Cover';
import FavoriteButton from './favoriteButton';
import { fetchUserData, handleFavoriteClick } from '../api/fetchData.js';

function Card({ Type, movie, serie, style }) {
    const [isAdded, setIsAdded] = useState(false);
    const [userDataFetched, setUserDataFetched] = useState(false);
    
    let Id;
    if (movie !== null) {
        Id = movie.id;
    } else if (serie !== null) {
        Id = serie.id;
    }

    useEffect(() => {
        if (!userDataFetched) {
            fetchUserData(setUserDataFetched, setIsAdded, movie, serie);
        }
    }, [userDataFetched, movie, serie]);

    return (
        <div>
          <Link to={`/result?id=${Id}&Type=${Type}`}>
            <div className="card">
                <div className="movie_card" id="bright">
                    <div className="info_section">
                        <div className="movie_header">
                            {Type === 'movie' ? ( <Cover Type="movie" Id={movie.id} number={3} /> ) : ( <Cover Type="tv" Id={serie.id} number={1} /> )}
                            {Type === 'movie' ? ( <h1>{movie.title}</h1> ) : ( <h1>{serie.name}</h1> )}
                            {sessionStorage.getItem('session') === null ? (
                                <h1>{userDataFetched}</h1>
                            ) : (
                                <div>
                                  <FavoriteButton handleClick={(e) => handleFavoriteClick(e, isAdded, Id, Type, setIsAdded)} isFavorite={isAdded} aria={true} />
                                </div>
                            )}
                            {Type === 'movie' ? ( <span className="minutes">{movie.vote_average}</span> ) : ( <span className="minutes">222</span> )}
                            {Type === 'movie' ? ( <p className="type">{movie.release_date}, {movie.original_language}</p> ) : ( <p className="type">{serie.first_air_date}</p> )}
                            {style !== 'res' ? (
                                <div className="movie_desc" id="style-5">
                                    {Type === 'movie' ? (
                                        <p className="text">{movie.overview}</p>
                                    ) : (
                                        <p className="text">{serie.overview}</p>
                                    )}
                                </div>
                            ) : (
                                Type === 'movie' ? (
                                    <p className="text">{movie.overview}</p>
                                ) : (
                                    <p className="text">{serie.overview}</p>
                                )
                            )}
                        </div>
                    </div>
                    {Type === 'movie' ? ( 
                        <div className="blur_back">
                            <Cover Type="movie" Id={movie.id} number={1} />
                        </div> 
                    ) : ( 
                        <div className="blur_back">
                            <Cover Type="tv" Id={serie.id} number={2} />
                        </div> 
                    )}
                </div>
            </div>
          </Link>
        </div>
    );
}

export default Card;
