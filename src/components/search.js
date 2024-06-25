import React, { useState, useEffect, useRef } from 'react';
import { getSearched } from '../api/getSearched';
import Card from './Card';
import GlitchingButton from './glitchingButton';
import "../styles/container.css"
function Search() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('movie');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const data = await getSearched(searchType, query);
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
      setSearchType(searchType === 'movie' ? 'tv' : 'movie');
    } else if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const movieDescRef = useRef(null);

  const isOverflowing = (element) => {
    return element.scrollHeight > element.clientHeight;
  };

  const autoScrollToEnd = () => {
    if (movieDescRef.current && isOverflowing(movieDescRef.current)) {
      movieDescRef.current.scrollTo({
        top: movieDescRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    autoScrollToEnd();
  }, [results]);

  return (
    <div>
      
      <div id="search">
        <svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
          <rect className="bar" />
          <g className="magnifier">
            <circle className="glass" />
            <line className="handle" x1="32" y1="32" x2="44" y2="44"></line>
          </g>
          <g className="sparks">
            <circle className="spark" />
            <circle className="spark" />
            <circle className="spark" />
          </g>
          <g className="burst pattern-one">
            <circle className="particle circle" />
            <path className="particle triangle" />
            <circle className="particle circle" />
            <path className="particle plus" />
            <rect className="particle rect" />
            <path className="particle triangle" />
          </g>
          <g className="burst pattern-two">
            <path className="particle plus" />
            <circle className="particle circle" />
            <path className="particle triangle" />
            <rect className="particle rect" />
            <circle className="particle circle" />
            <path className="particle plus" />
          </g>
          <g className="burst pattern-three">
            <circle className="particle circle" />
            <rect className="particle rect" />
            <path className="particle plus" />
            <path className="particle triangle" />
            <rect className="particle rect" />
            <path className="particle plus" />
          </g>
        </svg>
        <input
          type="search"
          onKeyDown={handleKeyPress}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <div className="right">
          <GlitchingButton handleClick={handleSearch} name={"Search"} aria={true} />
          <GlitchingButton handleClick={() => setSearchType(searchType === 'movie' ? 'tv' : 'movie')} name={searchType} aria={false} />
        </div>
      </div>

      {results.length === 0 ? (
        <div />
      ) : (
        <ul>
          {results.map((item) => (
            <li key={item.id} className="cardS">
               <style>
                {`
                .card {
                  margin-left: 10px;
                  background: aliceblue;
                  border-radius: 10px;
              }
                `}
            </style>
              {item.mediaType === 'movie' ? (
                <Card Type={"movie"} movie={item} />
              ) : (
                <Card Type={"serie"} serie={item} movie={null} />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
