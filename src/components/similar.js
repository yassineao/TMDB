import React from 'react';
import Slider from 'react-slick';
import Card from './Card';

const SimilarMoviesSlider = ({ similarMovies, t }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
    };

    return (
        <section className="SFilm">
            <h2>Similar Movies</h2>
            <Slider {...settings}>
                {similarMovies.map((item) =>
                    t === 'movie' ? (
                        <div className="noMov" >
                        <Card Type="movie" movie={item} key={item.id} />
                        </div>
                    ) : (
                        
                        <div className="noMov" >
                        <Card Type="serie" serie={item} movie={null} key={item.id} />
                        </div>
                    )
                )}
            </Slider>
        </section>
    );
};

export default SimilarMoviesSlider;
