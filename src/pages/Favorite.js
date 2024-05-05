import React, { useState, useEffect, useRef } from 'react';
import useFavoriteMovies from '../api/getFavorite';
import MovieF from '../components/FavoriteM';
import MovieSerieF from '../components/Favorite';
function FavoriteMoviesPage() {
    const [searchType, setSearchType] = useState('tv'); // 'movie' or 'tv'

    var { favoriteMovies, loading, error } = useFavoriteMovies(searchType);
    if (loading) {
        return <div>Loading favorite movies...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <div>
            <h2>Favorite Movies</h2>
            <button
            onClick={() => {
                setSearchType(searchType === 'movie' ? 'tv' : 'movie');
                window.location.reload();
            }}
            >
                            
                           Toggle Search Type (Current: {searchType})
                         </button>
            <ul>
                {favoriteMovies.map((Id) => (
                    <li key={favoriteMovies.id}>
                                <MovieSerieF t={searchType} Id={Id} />
                             
                             </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteMoviesPage;
