import React, { useState, useEffect } from 'react';
import "../styles/style.css";
import Cover from './Cover';
import getToken from '../api/getTokenU';
import updateFavoriteFilm from '../api/updateFavoriteFilm';

function Card({ Type,movie,serie }) {
  const [userDataFetched, setUserDataFetched] = useState(false); // Track if user data has been fetched

  const [isAdded, setIsAdded] = useState(false);
  const [Id, setId] = useState('');
  const [userData, setUserData] = useState(null); 
  const handleAddFavoriteFilm = async (type, Id, t) => {
    
    try {
      const response = await updateFavoriteFilm(type, Id, t);
      
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('session', data.token);
      } else {
        const errorData = await response.json();
        console.error('Failed to update favorite films:', errorData.message);
      
      }
    } catch (error) {
      console.error('Error updating favorite films:', error);
    
    }
  };

  const addToFavorites = () => {
    setIsAdded(!isAdded);
    var t = "movie";
    if (movie.id!==null){
        setId(movie.id);
        
        
    }
    else{
        setId(serie.id);
         t = "serie";
    
    }
    const type = isAdded ? "pull" : "addToSet";
    
    if (isAdded) {
      console.log('Remove from favorites:', movie.title);
    } else {
      console.log('Add to favorites:', movie.title);
    }
    console.log("Teee",t);
    handleAddFavoriteFilm(type, movie.id, t);

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
          console.log(user.favoriteFilms)
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
         {Type === 'movie' ? (
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
                               ) : (
        <div className="movie_card" id="bright" key={serie.id}>
        <div className="info_section">
            <div className="movie_header">
            <Cover Type="tv" Id={serie.id} number={1} />
            <h1>{serie.name}</h1>
            <h3>.</h3>
            <span className="minutes">222 </span>
            <p className="type">{serie.first_air_date}</p>
            </div>
            <div className="movie_desc">
            <p className="text">
                {serie.overview}
            </p>
            <p className="director">
                Director: {serie.created_by && serie.created_by.length > 0 ? serie.created_by[0].name : 'No Data'}
    
            </p>
            <p className="genre">
                                Genre: {serie.genres}
                            </p>
    
            </div>
        </div>
        <div className="blur_back">
            <Cover Type="tv" Id={serie.id} number={2} />
        </div>
        </div>
                               )}
     
    </div>
  );
}

export default Card;
