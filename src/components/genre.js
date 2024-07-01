
import React, { useState, useEffect } from 'react';
import TopGenre from '../components/topGenre';
import { fetchMGenres } from '../api/fetchMovieGen';
import '../styles/Cardd.css';
import '../styles/glitch.css';

function Genre({ genreId, name, handleTogglePopup, showPopup, type }) {
  const [bgColor, setBgColor] = useState('');
  const [films, setFilms] = useState([]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        setBgColor(getRandomColor());
        const genreM = await fetchMGenres(type, genreId);
        setFilms(genreM);
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      }
    };

    fetchMoviesByGenre();
  }, [genreId,type]);

  return (
    <div className="cardd" id="unique-card" onClick={() => handleTogglePopup(genreId)}>
      <div className="titlebar" style={{ backgroundColor: bgColor }}>
        <span className="buttons">
          <button className="minimize">
            <svg x="0px" y="0px" viewBox="0 0 10.2 1"><rect x="0" y="50%" width="10.2" height="1"></rect></svg>
          </button>
          <button className="maximize">
            <svg viewBox="0 0 10 10"><path d="M0,0v10h10V0H0z M9,9H1V1h8V9z"></path></svg>
          </button>
          <button className="close">
            <svg viewBox="0 0 10 10"><polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1"></polygon></svg>
          </button>
        </span>
      </div>
      <div className="cppcode">
        <div className="loader">
          <div data-gliitch={name} className="gliitch">{name}</div>
        </div>
      </div>
      <TopGenre showPopup={showPopup} bgColor={bgColor} films={films} type={type} />
    </div>
  );
}

export default Genre;