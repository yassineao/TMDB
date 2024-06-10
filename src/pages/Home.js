import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrending } from '../api/getTrending';
import { getMovies } from '../api/getMovies';
import Card from '../components/Card';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Cover  from '../components/Cover';
import getToken from '../api/getTokenU';
import '../styles/main.css';
import GlitchingButtons from '../components/glitchingButtons';
export default function Home() {
  const [userData, setUserData] = useState(null); 
  const [movies, setMovies] = useState([]);
  const [moviesP, setMoviesP] = useState([]);

  const [loading, setLoading] = useState(true);



  
  const fetchMovies = async () => {
    try {
      const data = await getTrending();
      const data1 = await getMovies();
      setMoviesP(data1);
      setMovies(data);
      console.log('Movie Dawwwta:', data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Movies:', error);
    }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getToken();
        setUserData(user); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); 
    fetchMovies();
    
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Transition speed in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Autoplay speed in milliseconds
  };
    return (
      <div >
      <head>
      <title>Dopetrope by HTML5 UP</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <link rel="stylesheet" href="assets/css/main.css" />
    </head>
    <body class="homepage is-preload">
   
      <div id="page-wrapper">
  
          <section id="header">
          <section id="banner">
                <header>
                <Slider {...settings}>
                {loading ? (
                    <p>Loading...</p>
                  ) : (
                    movies.results.slice(0, 5).map(movie => ( // Use slice(0, 20) to get only the first 20 movies
                    
                <div className="noMov">
                              <Card Type={"movie"} movie={movie} />

                  </div>
                
                    ))
                  )}
                  
                </Slider>
  
             
  
             
                 
                </header>
              </section>
         
              <section id="intro" class="container">
                <div class="row">
                  <div class="col-4 col-12-medium">
                    <section class="first">
                      <i class="icon solid featured fa-cog"></i>
                      <header>
                        <h2>Popular Movies</h2>
                      </header>
                      <p>Check out all the new popular movies</p>
                      <Link to="/popularMovies">Popular movies</Link>
                    </section>
                  </div>
                  <div class="col-4 col-12-medium">
                    <section class="middle">
                      <i class="icon solid featured alt fa-star"></i>
                      <header>
                        <h2>Popular series</h2>
                      </header>
                      <p>Check out all the new popular series</p>
                      <Link to="/popularSerie">Popular series</Link>
                    </section>
                  </div>
                  <div class="col-4 col-12-medium">
                    <section class="last">
                      <i class="icon solid featured alt2 fa-search"></i>
                      <header>
                        <h2>Search movie</h2>
                      </header>
                      <p>Check information about a film or a serie</p>
                      <Link to="/search">Search</Link>
                    </section>
                  </div>
                </div>
                <footer>
               
                </footer>
              </section>
  
          </section>
          <section id="main">
            <div class="container">
              <div class="row">
                <div class="col-12">
  
                    <section>
                      <header class="major">
                        <h2>Popular movies now</h2>
                      </header>
                      <div class="row">
                      {loading ? (
                          <p>Loading...</p>
                        ) : (
                          moviesP.results.slice(0, 6).map(movie => ( // Use slice(0, 20) to get only the first 20 movies
                          
                                  
                          

                                    <div class="col-4 col-6-medium col-12-small">
                          <section class="box">
                            <a href="#" class="image featured"><Cover Type="movie" Id={movie.id} number={1} /> </a>
                            <header>
                              <h3>{movie.title}</h3>
                            </header>
                            <p>{movie.overview}</p>
                          
                          </section>
                        </div>

                      
                          ))
                        )}
                       
                      </div>
                    </section>
  
                </div>
                <div class="col-12">
  
                    <section>
                    
                    </section>
  
                </div>
              </div>
            </div>
          </section>
  
          <section id="footer">

          </section>
  
      </div>
  
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/jquery.dropotron.min.js"></script>
        <script src="assets/js/browser.min.js"></script>
        <script src="assets/js/breakpoints.min.js"></script>
        <script src="assets/js/util.js"></script>
        <script src="assets/js/main.js"></script>
  
    </body>
    
    </div>
  
  );
}