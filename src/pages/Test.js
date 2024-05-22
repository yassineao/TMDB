import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cover from '../components/Cover';
import '../styles/test.css';
import{fetchMovieDetails} from '../api/getMovie.js'
import{fetchCastDetails} from '../api/getActors.js'

function Test() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState(null);
    
    const [cast, setCast] = useState([]);
    const Id = params.get('id');
    const apiKey = '831a4bb8a39f71fea9d3c2efe8fb5ab2';
    const t = "movie";
    
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
        <div class="unique-container">
          <body>
            <section className="movie-card">
                <a href="#">
                    <Cover Type={t} Id={item.id} number={t === 'movie' ? 3 : 1} classN={"cover"} />
                </a>
                <div className="hero">
                    <div className="details">
                        <div className="title1">{item.title} <span>PG-13</span></div>
                        <div className="title2">{item.tagline}</div>
                        <fieldset className="rating">
                            <input type="radio" id="star5" name="rating" value="5" /><label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>
                            <input type="radio" id="star4half" name="rating" value="4 and a half" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                            <input type="radio" id="star4" name="rating" value="4" defaultChecked /><label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                            <input type="radio" id="star3half" name="rating" value="3 and a half" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
                            <input type="radio" id="star3" name="rating" value="3" /><label className="full" htmlFor="star3" title="Meh - 3 stars"></label>
                            <input type="radio" id="star2half" name="rating" value="2 and a half" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                            <input type="radio" id="star2" name="rating" value="2" /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                            <input type="radio" id="star1half" name="rating" value="1 and a half" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
                            <input type="radio" id="star1" name="rating" value="1" /><label className="full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                            <input type="radio" id="starhalf" name="rating" value="half" /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
                        </fieldset>
                    </div>
                </div>
                <div className="description">
                    <div className="column1">
                        {item.genres.map(gen => (
                            <span className="tag" key={gen.id}>{gen.name}</span>
                        ))}
                    </div>
                    <div className="column2">
                        <p className="text">{item.overview}</p>
                    </div>
                </div>
            </section>
            <section id="extraDetails">
                <h1 className="extra">Original Language: {item.original_language}</h1>
                <h1 className="extra">Popularity: {item.popularity}</h1>
                <h1 className="extra">Release Date: {item.release_date}</h1>
                <h1 className="extra">Vote Average: {item.vote_average}</h1>
            </section>
            <section className="actors">
                    {cast.slice(0, 30).map(actor => (
                        <div key={actor.cast_id} className="actor-card">
                            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} className="actor-image" />
                            <h2 className="actor-name">{actor.name}</h2>
                            <p className="actor-role">{actor.character}</p>
                        </div>
                    ))}
            </section>
            <section className="SFilm">
                <Slider {...settings}>
                    <div><h1>SFilm 1</h1></div>
                    <div><h1>SFilm 2</h1></div>
                    <div><h1>SFilm 3</h1></div>
                </Slider>
            </section>
          </body>
        </div>
    );
}

export default Test;
