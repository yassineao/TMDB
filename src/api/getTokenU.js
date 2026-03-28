import API_BASE_URL from './apiBaseUrl';

async function getToken() {
    try {
        const response = await fetch(`${API_BASE_URL}/protected`, {
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
        return data.user;
      } catch (error) {
        console.error(error);
      }
  }
  
  export default getToken;
  