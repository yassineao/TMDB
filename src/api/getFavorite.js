import { useState, useEffect } from 'react';

import getToken from '../api/getTokenU';
function useFavoriteMovies() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userDataFetched, setUserDataFetched] = useState(false); 
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Call the getToken function to fetch user data only if it hasn't been fetched before
            if (!userDataFetched) {
              const user = await getToken();
              console.log(user);// Set user data to state
              setUserDataFetched(true); // Update the state to indicate that user data has been fetched
       
            
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData(); // Call the async function to fetch data
      }, [userDataFetched]);
    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                const token = sessionStorage.getItem('session');
                const response = await fetch('http://localhost:5000/favorite-movies', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFavoriteMovies(data);
                    setLoading(false);
                } else {
                    setError('Failed to fetch favorite movies');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching favorite movies:', error);
                setError('Error fetching favorite movies');
                setLoading(false);
            }
        };

        fetchFavoriteMovies();
    }, []);

    return { favoriteMovies, loading, error };
}

export default useFavoriteMovies;
