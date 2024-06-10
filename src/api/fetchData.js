import getToken from '../api/getTokenU';
import updateFavoriteFilm from '../api/updateFavoriteFilm';

export const fetchUserData = async (setUserDataFetched, setIsAdded, movie, serie) => {
  try {
    const user = await getToken();
    setUserDataFetched(true);

    let numberExists = false;
    if (movie !== null) {
      numberExists = user.favoriteFilms.includes(movie.id);
    } else if (serie !== null) {
      numberExists = user.favoriteSeries.includes(serie.id);
    }

    setIsAdded(numberExists);
  } catch (error) {
    console.error(error);
  }
};

export const handleFavoriteClick = async (e, isAdded, Id, Type, setIsAdded) => {
  try {
    e.preventDefault();
    const type = isAdded ? 'pull' : 'addToSet';
    const response = await updateFavoriteFilm(type, Id, Type);

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('session', data.token);
      setIsAdded(!isAdded);
    } else {
      const errorData = await response.json();
      console.error('Failed to update favorite films:', errorData.message);
    }
  } catch (error) {
    console.error('Error updating favorite films:', error);
  }
};
