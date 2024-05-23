import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cover from '../components/Cover';
import '../styles/test.css';
import { fetchMovieDetails } from '../api/getMovie';
import { fetchCastDetails, fetchSimilarMovies } from '../api/getActors';
import Card from '../components/Card';

function Test() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [cast, setCast] = useState([]);
    const Id = params.get('id');
    const t = params.get('Type');

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
    };

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const movieData = await fetchMovieDetails(Id, t);
                setItem(movieData);
                const castData = await fetchCastDetails(Id, t);
                setCast(castData.cast);
                const similarMoviesData = await fetchSimilarMovies(Id, t);
                setSimilarMovies(similarMoviesData.results);
                setLoading(false);
            } catch (error) {
                console.error('Error loading details:', error);
            }
        };

        loadDetails();
    }, [Id, t]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="unique-container">
            <style>
                {`
                .unique-container .hero::before {
                    background-image: url('https://image.tmdb.org/t/p/original${item.backdrop_path}');
                    background-size: cover;
                }

                .unique-container .hero {
                    position: relative; /* Required to make the pseudo-element positioning work */
                }
                `}
            </style>
            <section className="movie-card">
                
            <div className="details">
                        {t === 'movie' ? (
                            <h2 className="title1">{item.title}</h2>
                        ) : (
                            <h2 className="title1">{item.name}</h2>
                        )}
                        <span>PG-13</span>
                        <div className="title2">{item.tagline}</div>
                  
                    </div>
                <div className="hero">
                    {t === 'movie' ? (
                        <Cover Type="movie" Id={item.id} number={1} classN="cover" />
                    ) : (
                        <Cover Type="tv" Id={item.id} number={2} classN="cover" />
                    )}

                </div>

                <div className="description">
                    <div className="column1">
                        {item.genres.map((gen) => (
                            <span className="tag" key={gen.id}>{gen.name}</span>
                        ))}
                    </div>
                    <div className="column2">
                        <p className="text">{item.overview}</p>
                    </div>
                    <div id="extraDetails">
                        <h1 className="extra">Original Language: {item.original_language}</h1>
                        {t === 'movie' ? (
                            <h1 className="extra">Release Date: {item.release_date}</h1>
                        ) : (
                            <h1 className="extra">Release Date: {item.first_air_date}</h1>
                        )}

                        <h1 className="extra">Popularity: {item.popularity}</h1>
                        <h1 className="extra">Vote Average: {item.vote_average}</h1>
                    </div>
                </div>
            </section>

            <h2 id="actors">Actors</h2>
            <section className="actors" id="style-5">
                {cast.slice(0, 30).map((actor) => (
                    <div key={actor.cast_id} className="actor-card">
                        <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} className="actor-image" />
                        <h2 className="actor-name">{actor.name}</h2>
                        <p className="actor-role">{actor.character}</p>
                    </div>
                ))}
            </section>

            <section className="SFilm">
                <h2>Similar Movies</h2>
                <Slider {...settings}>
                    {similarMovies.map((item) =>
                        t === 'movie' ? (
                            <Card Type="movie" movie={item} key={item.id} />
                        ) : (
                            <Card Type="serie" serie={item} movie={null} key={item.id} />
                        )
                    )}
                </Slider>
            </section>
        </div>
    );
}

export default Test;
