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
                        e.target.src = 'https://i.pinimg.com/1200x/7c/e2/ce/7ce2ce45c1edb8543379e8db68645602.jpg';
                    }}
                />
                <h2 className="actor-name">{actor.name}</h2>
                <p className="actor-role">{actor.character}</p>
            </div>
        ))}
    </section>
);

export default ActorsList;
