async function updateFavoriteFilm(type, filmId) {
    try {
      const response = await fetch('http://localhost:5000/add-favorite-film', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('session')}`,
        },
        body: JSON.stringify({ type, filmId })
      });
      return response;
    } catch (error) {
      console.error('Error updating favorite films:', error);
      throw error;
    }
  }
  
  export default updateFavoriteFilm;
  