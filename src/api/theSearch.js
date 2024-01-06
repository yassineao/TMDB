import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MovieDetails from '../components/genres';

import MoviePoster from '../components/image';
import MovieSearch from '../components/search';

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

  return (
    <div>
    <MovieSearch />


    </div>
  );
};

export default PopularSeries;
