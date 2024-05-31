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
import MovieHeader from '../components/movieHeader';
import MovieDetails from '../components/movieDetails';
import TrailerPopup from '../components/trailer';
import PhotoGallery from '../components/photoGallery';
import ActorsList from '../components/actorsList';
import SimilarMoviesSlider from '../components/similar';
import SocialMedia from '../components/social';

function Page() {
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
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [showCatalogPopup, setShowCatalogPopup] = useState(false);
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleImageClick = (image) => {
        if (t === "movie") {
            setCurrentImage(<Cover Type="movie" Id={item.id} number={image} classN="cover" />);
        } else {
            setCurrentImage(<Cover Type="movie" Id={item.id} number={image} classN="cover" />);
        }
        setShowImagePopup(true);
    };

    const handleCatalogPopup = () => {
        setShowCatalogPopup(true);
    };

    const handleTogglePopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const movieData = await fetchMovieDetails(Id, t);
                setItem(movieData);
                const trailer = movieData.videos.results.find(video => video.type === 'Trailer');
                setVideoKey(trailer ? trailer.key : '');
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
            <MovieDetails item={item} t={t} />
            <section className="movie-card">
                <MovieHeader item={item} t={t} />
                <div className="hero"></div>
                <TrailerPopup showPopup={showPopup} handleTogglePopup={handleTogglePopup} videoKey={videoKey} opts={opts} />

                <div className="column2">
                    <p className="text">{item.overview}</p>
                </div>
            
            </section>
            
           
            <h2 id="actors">Photos</h2>
            <section className="fotos">            
                <PhotoGallery item={item} t={t} handleImageClick={handleImageClick} showImagePopup={showImagePopup} currentImage={currentImage} setShowImagePopup={setShowImagePopup} />
            </section>
            <div className="background-section"></div>
            
            <h2 id="actors">Actors</h2>
            <ActorsList cast={cast} />
            <SimilarMoviesSlider similarMovies={similarMovies} t={t} />
            <div className="background-section"><SocialMedia /></div>
            
        </div>
    );
}

export default Page;
