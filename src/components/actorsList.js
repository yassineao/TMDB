import React from 'react';

const ActorsList = ({ cast }) => (
    <section className="actors" id="style-8">
        {cast.slice(0, 30).map((actor) => (
            <div key={actor.cast_id} className="actor-card">
                <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="actor-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://r4.wallpaperflare.com/wallpaper/198/872/888/numbers-404-not-found-simple-background-minimalism-wallpaper-17a93acbb6fa45c5bcfd98b088d7a993.jpg';
                    }}
                />
                <h2 className="actor-name">{actor.name}</h2>
                <p className="actor-role">{actor.character}</p>
            </div>
        ))}
    </section>
);

export default ActorsList;
