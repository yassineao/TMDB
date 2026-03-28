import API_BASE_URL from './apiBaseUrl';

async function updateFavoriteFilm(type, Id ,t) {
    try {
      console.log("pppppp",t, Id)
      const response = await fetch(`${API_BASE_URL}/add-favorite-film`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('session')}`,
        },
        body: JSON.stringify({ Id, type, t})
      });
      
      return response;
    } catch (error) {
      console.error('Error updating favorite films:', error);
      throw error;
    }
  }
  
  export default updateFavoriteFilm;
  