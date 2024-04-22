import { useState, useEffect } from 'react';

function useFavoriteMovies() {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
