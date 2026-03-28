import React from 'react';

const ActorsList = ({ cast }) => (
    <section className="actors" id="style-5">
        {cast.slice(0, 30).map((actor) => (
            <div key={actor.cast_id} className="actor-card">
                <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="actor-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        const card = e.target.closest('.actor-card');
                        if (card) {
                            card.style.display = 'none';
                        }
                    }}
                />
                <h2 className="actor-name">{actor.name}</h2>
                <p className="actor-role">{actor.character}</p>
            </div>
        ))}
    </section>
);

export default ActorsList;
