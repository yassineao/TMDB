import { useState, useEffect } from 'react';
import "../styles/style.css";
import Cover from './Cover';

function Movie({ movie }) {
  const [isAdded, setIsAdded] = useState(false);
  const [filmId, setFilmId] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/protected', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('session')}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAddFavoriteFilm = async (type, filmId) => {
    try {
      const token = sessionStorage.getItem('session');
      const response = await fetch('http://localhost:5000/add-favorite-film', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ type, filmId })
      });

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
    if (isAdded) {
      console.log('Remove from favorites:', movie.title);
      handleAddFavoriteFilm("pull", movie.id);
    } else {
      console.log('Add to favorites:', movie.title);
      handleAddFavoriteFilm("addToSet", movie.id);
    }
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
