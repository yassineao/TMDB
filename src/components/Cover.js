import React, { useState, useEffect } from 'react';
import "../styles/style.css"
import { getPoster } from '../api/getPoster';

function Cover({ Type, Id ,number,classN,PB}) {
  const [cover, setCover] = useState([]);
  const [imageFailed, setImageFailed] = useState(false);
if (classN===undefined){
  classN= "locandina"
}
  const fetchCover = async () => {
    try {
      const data1 = await getPoster(Type, Id);
      if (data1.posters && data1.posters.length > 0) {
        
        if (PB===undefined){
          setCover(data1.posters[number]);
        }
        else
        setCover(data1.backdrops[number]);
      } else {
        console.error('No poster found for this movie.');
      }
    } catch (error) {
      console.error('Error fetching poster:', error);
    }
  };

  useEffect(() => {
    fetchCover();
    setImageFailed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Type, Id]);

  if (classN === "S" && (!cover || !cover.file_path || imageFailed)) {
    return null;
  }

  return (
    <div>
      {cover && cover.file_path ? (
        <img
          className={classN}
          src={`https://image.tmdb.org/t/p/w500${cover.file_path}`}
          alt="Cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <img className={classN} src="https://i.pinimg.com/1200x/7c/e2/ce/7ce2ce45c1edb8543379e8db68645602.jpg" alt="Not found" />
      )}
    </div>
  );
}

export default Cover;
