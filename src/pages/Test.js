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
export default function Hwome() {
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
      
                   <GlitchingButtons/>
            
    </div>
  
  );
}