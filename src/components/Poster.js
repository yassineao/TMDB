import React, { useState, useEffect } from 'react';
import "../styles/style.css"
import { getPoster } from '../api/getPoster';

function Poster({ movieId }) { 

  const [poster, setPoster] = useState([]);

  const fetchPoster = async () => {
    try {
      const data1 = await getPoster(movieId);
      
      if (data1.posters && data1.posters.length > 0) {
        setPoster(data1.posters[1]);
      } else {
        console.error('No poster found for this movie.');
      }
      console.log(poster)
    } catch (error) {
      console.error('Error fetching poster:', error);
    }
  };

  useEffect(() => {
    fetchPoster();
  }, [fetchPoster]); 


  return (
    <div>
        <img className="locandina" src={`https://image.tmdb.org/t/p/w500${poster}`} alt="nice" />
    </div>
  );
}

export default Poster;
