import React, { useEffect, useState } from 'react';

import MovieSerieF from '../components/Favorite';import '../styles/test.css';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getMovies } from '../api/getMovies';
import Cover  from '../components/Cover';

import getToken from '../api/getTokenU';
function Test() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
  
    const [loading, setLoading] = useState(true);
    const Id = params.get('id');
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000, // Transition speed in milliseconds
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000, // Autoplay speed in milliseconds
      };


      const t = "movie";
      const apiKey = '831a4bb8a39f71fea9d3c2efe8fb5ab2';
      const [item, setItem] = useState(null);
      var response =null;
      useEffect(() => {
        
          fetchMovieDetails();
      }, [Id, apiKey]);



      const fetchMovieDetails = async () => {
        try {
            if(t==="movie"){
                 response = await fetch(`https://api.themoviedb.org/3/movie/${Id}?api_key=${apiKey}`);

            }
            else{
                console.log("pepepepep");
                 response = await fetch(`https://api.themoviedb.org/3/tv/${Id}?api_key=${apiKey}`);

            }
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            const item = await response.json();
            console.log(item)
            setLoading(false);

            setItem(item);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };














  return (
    <div>

    <section class="movie-card">
    <a href="#">

        
        {t === 'movie' ? (  <Cover Type="movie" Id={item.id} number={3} classN={"cover"}/>  ) : ( <Cover Type="tv" Id={item.id} number={1} />)}

        </a>

    <div class="hero">
            
      <div class="details">
      
        <div class="title1">{item.title} <span>PG-13</span></div>

        <div class="title2">The Battle of the Five Armies</div>    
        
        <fieldset class="rating">
    <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
    <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
    <input type="radio" id="star4" name="rating" value="4" checked /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
    <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
    <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
    <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
    <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
    <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
    <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
    <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
  </fieldset>
        
        
      </div>
      
    </div> 
    
    <div class="description">
      
      <div class="column1">
        {loading ? (
            <p>Loading...</p>
          ) : (
            item.genre_id.map(gen => ( 
                <span class="tag">{gen}</span>
                ))
          )}
        <span class="tag">genre_ids</span>
        <span class="tag">fantasy</span>
        <span class="tag">adventure</span>
      </div> 
      
      <div class="column2">
        
      {t === 'movie' ? (  <p className="text">{item.overview}</p>) : (  <p className="text">{item.overview}</p>)}
        
        
        
        
        
      </div> 
    </div>
    
   
</section >

<section id="extraDetails" >
                <h1 className='extra'>original language: {item.original_language}</h1>
                <h1 className='extra'> popularity: {item.popularity}</h1>
                <h1 className='extra'>release date: {item.release_date}</h1>
                <h1 className='extra'>vote average: {item.vote_average}</h1>




</section>


<section classname="actors">
                <Slider {...settings}>
                <div><h1>Actor1</h1> <h1>Actor1</h1> <h1>Actor1</h1> <h1>Actor1</h1>  </div>
                <div><h1>Actor1</h1>  </div>
                <div><h1>Actor1</h1>  </div>
                          
                  
                
                  
                </Slider>
  




</section>
<section classname="SFilm">
                <Slider {...settings}>
                <div><h1>SFilm</h1> <h1>SFilm</h1> <h1>SFilm</h1> <h1>SFilm</h1>  </div>
                <div><h1>SFilm</h1>  </div>
                <div><h1>SFilm</h1>  </div>
                          
                  
                
                  
                </Slider>
  




</section>
    </div>
  );
}


export default Test;