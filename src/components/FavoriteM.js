import { useState, useEffect } from 'react';
import Card from './Card';
function MovieF({ movieId }) {
    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
    const [movie, setMovieData] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const movie = await response.json();
                setMovieData(movie);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movieId, apiKey]);

    return (
        <div>
            {movie ? (
               <Card Type={"movie"} movie={movie} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MovieF;
