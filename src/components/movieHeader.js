import React from 'react';
import Cover from './Cover';

const MovieHeader = ({ item, t }) => (
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
            </div>
        </div>
);

export default MovieHeader;
