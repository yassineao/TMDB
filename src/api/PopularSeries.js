import React, { useState, useEffect, useRef } from 'react';import axios from 'axios';
import SeriePoster from '../components/imageSerie';
import SerieDetails from '../components/detailsSerie';

const PopularSeries = () => {


   const [series, setSeries] = useState([]);

    useEffect(() => {
      axios
        .get('https://api.themoviedb.org/3/tv/popular', {
          params: {
            api_key: 'e3436ec42b993f82543c9bdaa01a5e45',
          },
        })
        .then(response => {
          setSeries(response.data.results);
        });
    }, []);



  // Create a ref for the movie_desc element
  const movieDescRef = useRef(null);

  // Function to check if the content is overflowing
  const isOverflowing = (element) => {
    return element.scrollHeight > element.clientHeight;
  };

  // Function to auto-scroll the movie_desc element to the end if it's overflowing
  const autoScrollToEnd = () => {
    if (movieDescRef.current && isOverflowing(movieDescRef.current)) {
      movieDescRef.current.scrollTo({
        top: movieDescRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // Call the autoScrollToEnd function whenever the item prop changes or when querying new movies
  useEffect(() => {
    autoScrollToEnd();
  }, [series]);

  return (
    <div>
      <h1 className="titles">Popular series</h1>
      <div className="card">
        {series.map((serie) => (
          <div className="movie_card" id="bright" key={serie.id}>
            <div className="info_section">
              <div className="movie_header">
                <SeriePoster SerieId={serie.id} />
                <h1>{serie.name}</h1>
                <h3>.</h3>
                <span className="minutes"><SerieDetails SerieId={serie.id}/> </span>
                <p className="type">{serie.first_air_date}</p>
              </div>
              <div className="movie_desc">
                <p className="text">
                  {serie.overview}
                </p>
                <p className="director">
                  Director: {serie.created_by && serie.created_by.length > 0 ? serie.created_by[0].name : 'No Data'}

                </p>
                <p className="genre">
                                  Genre: {serie.genres}
                                </p>

              </div>
            </div>
            <div className="blur_back">
              <SeriePoster SerieId={serie.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSeries;
