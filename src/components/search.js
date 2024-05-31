import React, { useState, useEffect, useRef } from 'react';
import { getSearched } from '../api/getSearched';
import Card from './Card';

function Search() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('movie'); // 'movie' or 'tv'
  const [results, setResults] = useState([]);


  const handleSearch = async () => {
    try {
      const data = await getSearched(searchType,query);
      // Add a 'mediaType' property to each item in the results array
      const itemsWithMediaType = data.results.map((item) => ({
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
                        <div/>

                       ) : (
                        
                         <ul id="sea">
                           {results.map((item) => (
                             <li key={item.id} className="cardS">
                               {item.mediaType === 'movie' ? (
                                <Card Type={"movie"} movie={item} />
                               ) : (
                                <Card Type={"serie"} serie={item} movie={null}/>
                              )}
                             </li>
                           ))}
                         </ul>
                       )}
                     </div>
                   );
                 }

                 export default Search;