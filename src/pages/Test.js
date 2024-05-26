import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cover from '../components/Cover';
import '../styles/test.css';
import '../styles/details.css';
import { fetchMovieDetails } from '../api/getMovie';
import { fetchCastDetails, fetchSimilarMovies } from '../api/getActors';
import Card from '../components/Card';
import YouTube from 'react-youtube';

function Test() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [cast, setCast] = useState([]);
    const Id = params.get('id');
    const t = params.get('Type');
    const [showPopup, setShowPopup] = useState(false);
    const [videoKey, setVideoKey] = useState('');

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
    };

    const handleTogglePopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const movieData = await fetchMovieDetails(Id, t);
                setItem(movieData);
                setVideoKey(movieData.videos.results.length > 0 ? movieData.videos.results[0].key : '');
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

    useEffect(() => {
        if (item) {
            const backgroundUrl = item.backdrop_path
                ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                : item.poster_path
                ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                : '';
            if (backgroundUrl) {
                document.body.style.backgroundImage = `url('${backgroundUrl}')`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundAttachment = 'fixed';
            }
        }
        return () => {
            document.body.style.backgroundImage = '';
        };
    }, [item]);

    useEffect(() => {
        if (showPopup) {
            document.body.classList.add('popup-active');
        } else {
            document.body.classList.remove('popup-active');
        }
    }, [showPopup]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="unique-container">
            <style>
                {`
                .unique-container .hero::before {
                    background-image: url('https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path}');
                    background-size: cover;
                    content: "";
                    display: block;
                    height: 300px;
                }

                .background-section {
                    background-image: url('https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path}');
                    background-size: cover;
                    background-repeat: no-repeat;
                    height: 300px;
                }

                .background-section:nth-of-type(1) {
                    background-position: center;
                    transform: skewY(-2.2deg);
                }

                .background-section:nth-of-type(2) {
                    background-position: bottom;
                }
                `}
            </style>
            <section className="movie-card">
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
                <div className="hero"></div>
                <div className="description">
                    <div className="column1"></div>
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
                <div>
                    <button onClick={handleTogglePopup}>Open Popup</button>
                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <button className="popup-close-button" onClick={handleTogglePopup}>&times;</button>
                                <YouTube videoId={videoKey} opts={opts} />
                            </div>
                        </div>
                    )}
                </div>
                <div className="gradient-cards">
                    {/* Your existing card content */}
                </div>
            </section>
            <div className="background-section"></div>
            <h2 id="actors">Actors</h2>
            <section className="actors" id="style-5">
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
            <div className="background-section"></div>
        </div>
    );
}

export default Test;
