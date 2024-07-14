import React, { useState, useEffect, useRef } from 'react';
import useFavoriteMovies from '../api/getFavorite';
import MovieSerieF from '../components/Favorite';
import GlitchingButton from '../components/glitchingButton';
function FavoriteMoviesPage() {
    const [searchType, setSearchType] = useState('movie'); // 'movie' or 'tv'

    var { favoriteMovies, loading, error } = useFavoriteMovies(searchType);
    if (loading) {
        return <div>Loading favorite movies...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const handleToggleSearchType = () => {
        const newSearchType = searchType === 'movie' ? 'tv' : 'movie';
        setSearchType(newSearchType);
    };
    return (
        <div>
               <h1 class="titles">Favorite  </h1>
               <div id='uni'>       
 
                <GlitchingButton handleClick={handleToggleSearchType} name={searchType} aria={false}/>
                </div>
            <ul class="midd">
                {favoriteMovies.map((Id) => (
                    <li key={favoriteMovies.id} className="cardS">
                       
                                <MovieSerieF t={searchType} Id={Id} />
                             
                             </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoriteMoviesPage;
