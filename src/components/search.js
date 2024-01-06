import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MoviePoster from '../components/image';

import SeriePoster from '../components/imageSerie';
import SerieDetails from '../components/detailsSerie';
const API_KEY = 'e3436ec42b993f82543c9bdaa01a5e45';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('movie'); // 'movie' or 'tv'
  const [results, setResults] = useState([]);


  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${searchType}`,
        {
          params: {
            api_key: API_KEY,
            language: 'en-US',
            query: query,
          },
        }
      );
      // Add a 'mediaType' property to each item in the results array
      const itemsWithMediaType = response.data.results.map((item) => ({
        ...item,
        mediaType: searchType === 'movie' ? 'movie' : 'tv',
      }));
      setResults(itemsWithMediaType);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Tab') {
      // Toggle between 'movie' and 'tv' search types when the "Tab" key is pressed
      setSearchType(searchType === 'movie' ? 'tv' : 'movie');
    } else if (event.key === 'Enter') {
      // Perform search when the "Enter" key is pressed
      handleSearch();
    }
  };


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
  }, [results]);

  return (
    <div>








      <div id="search">
                  	<svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
                  		<rect class="bar"/>

                  		<g class="magnifier">
                  			<circle class="glass"/>
                  			<line class="handle" x1="32" y1="32" x2="44" y2="44"></line>
                  		</g>

                  		<g class="sparks">
                  			<circle class="spark"/>
                  			<circle class="spark"/>
                  			<circle class="spark"/>
                  		</g>

                  		<g class="burst pattern-one">
                  			<circle class="particle circle"/>
                  			<path class="particle triangle"/>
                  			<circle class="particle circle"/>
                  			<path class="particle plus"/>
                  			<rect class="particle rect"/>
                  			<path class="particle triangle"/>
                  		</g>
                  		<g class="burst pattern-two">
                  			<path class="particle plus"/>
                  			<circle class="particle circle"/>
                  			<path class="particle triangle"/>
                  			<rect class="particle rect"/>
                  			<circle class="particle circle"/>
                  			<path class="particle plus"/>
                  		</g>
                  		<g class="burst pattern-three">
                  			<circle class="particle circle"/>
                  			<rect class="particle rect"/>
                  			<path class="particle plus"/>
                  			<path class="particle triangle"/>
                  			<rect class="particle rect"/>
                  			<path class="particle plus"/>
                  		</g>
                  	</svg>
                  <input
                           type="search"
                           onKeyDown={handleKeyPress}
                           value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           placeholder="Search for a movie..."
                         />
                         <button onClick={handleSearch} className="pulse">
                           Search
                         </button>
                         <button
                           onClick={() => setSearchType(searchType === 'movie' ? 'tv' : 'movie')}
                         >
                           Toggle Search Type (Current: {searchType})
                         </button>
                       </div>

                       {results.length === 0 ? (
                         <p>No results found.</p>
                       ) : (
                         <ul>
                           {results.map((item) => (
                             <li key={item.id}>
                               {item.mediaType === 'movie' ? (
                                 <div className="movie_card" id="bright" key={item.id}>
                                   <div className="info_section">
                                     <div className="movie_header">
                                       <MoviePoster movieId={item.id} />
                                       <h1>{item.title}</h1>
                                       <h3>.</h3>
                                       <span className="minutes">{item.vote_average}</span>
                                       <p className="type">
                                         {item.release_date}, {item.original_language}
                                       </p>
                                       <h1>{item.genres}</h1>
                                     </div>
                                     <div className="movie_desc" ref={movieDescRef}>
                                       <p className="text">{item.overview}</p>
                                     </div>
                                   </div>
                                   <div className="blur_back">
                                     {/* Check if the movie poster file_path is available */}
                                     {item.poster_path && (
                                       <img
                                         src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                         alt={item.title}
                                       />
                                     )}
                                   </div>
                                 </div>
                               ) : (
                                 <div className="movie_card" id="bright" key={item.id}>
                                   <div className="info_section">
                                     <div className="movie_header">
                                       <SeriePoster SerieId={item.id} />
                                       <h1>{item.name}</h1>
                                       <h3>.</h3>
                                       <span className="minutes">
                                         <SerieDetails SerieId={item.id} />
                                       </span>
                                       <p className="type">{item.first_air_date}</p>
                                     </div>
                                     <div className="movie_desc" ref={movieDescRef}>
                                       <p className="text">{item.overview}</p>
                                     </div>
                                   </div>
                                   <div className="blur_back">
                                     <SeriePoster SerieId={item.id} />
                                   </div>
                                 </div>
                               )}
                             </li>
                           ))}
                         </ul>
                       )}
                     </div>
                   );
                 }

                 export default MovieSearch;