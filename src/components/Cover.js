import React, { useState, useEffect } from 'react';
import "../styles/style.css"
import { getPoster } from '../api/getPoster';

function Cover({ Type, Id ,number}) {
  const [cover, setCover] = useState([]);

  const fetchCover = async () => {
    try {
      const data1 = await getPoster(Type, Id);
      if (data1.posters && data1.posters.length > 0) {
        setCover(data1.posters[number]);
      } else {
        console.error('No poster found for this movie.');
      }
    } catch (error) {
      console.error('Error fetching poster:', error);
    }
  };

  useEffect(() => {
    fetchCover();
  }, [Type, Id]); // Depend on Type and Id instead of fetchCover

  return (
    <div>
  {cover && cover.file_path ? (
    <img className="locandina" src={`https://image.tmdb.org/t/p/w500${cover.file_path}`} alt="Cover" />
  ) : (
    <img className="locandina" src="https://i.pinimg.com/originals/53/c4/61/53c46186693e5305886fb4d3dca1b107.jpg" alt="Fallback Cover" />
  )}
</div>
  );
}

export default Cover;
