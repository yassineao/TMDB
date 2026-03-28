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
      {poster ? (
        <img className="locandina" src={`https://image.tmdb.org/t/p/w500${poster}`} alt="nice" />
      ) : (
        <img className="locandina" src="https://i.pinimg.com/1200x/7c/e2/ce/7ce2ce45c1edb8543379e8db68645602.jpg" alt="Not found" />
      )}
    </div>
  );
}

export default Poster;
