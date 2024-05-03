import React from 'react';
import useFavoriteMovies from '../api/getFavorite';
import MovieF from '../components/FavoriteM';

function FavoriteMoviesPage() {
    const { favoriteMovies, loading, error } = useFavoriteMovies('movie');

    if (loading) {
        return <div>Loading favorite movies...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Favorite Movies</h2>
            <ul>
                {favoriteMovies.map((movieId) => (
                    <li key={movieId}><MovieF movieId={movieId}/></li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteMoviesPage;
