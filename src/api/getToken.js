async function getToken() {
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
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
  }
  
  export default getToken;
  