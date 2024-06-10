import React, { useState, useEffect } from 'react';
import Cover from './Cover';
import FavoriteButton from './favoriteButton';
import { fetchUserData, handleFavoriteClick } from '../api/fetchData';

const MovieHeader = ({ item, t }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [userDataFetched, setUserDataFetched] = useState(false);

    useEffect(() => {
        if (!userDataFetched) {
            fetchUserData(setUserDataFetched, setIsAdded, t === 'movie' ? item : null, t === 'tv' ? item : null);
        }
    }, [userDataFetched, item, t]);

    return (
        <div className="cover-title-container">
            {t === 'movie' ? (
                <Cover Type="movie" Id={item.id} number={1} classN="cover" />
            ) : (
                <Cover Type="tv" Id={item.id} number={2} classN="cover" />
            )}
            <div className="details">
                {t === 'movie' ? (
                    <h2 className="title1">{item.title}</h2>
                ) : (
                    <h2 className="title1">{item.name}</h2>
                )}
                <span>PG-13</span>
                <div className="title2">{item.tagline}</div>
                {item.genres.map((gen) => (
                    <span className="tag" key={gen.id}>{gen.name}</span>
                ))}
                <div className="favorite-button-container">
                    {sessionStorage.getItem('session') && (
                        <FavoriteButton
                            handleClick={(e) => handleFavoriteClick(e, isAdded, item.id, t, setIsAdded)}
                            isFavorite={isAdded}
                            aria={true}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieHeader;
