import React, { useState } from 'react';
import '../styles/button3.css';

const FavoriteButton = ({  handleClick ,isFavorite}) => {


  return (
    <button
      className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
      aria-pressed={isFavorite}
      onClick={handleClick}
    >
      <svg
        className="feather feather-heart"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 24 24"
        height="24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="pink" stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;1" dur="0.3s" fill="freeze" />
            </stop>
            <stop offset="100%" stopColor="pink" stopOpacity="1">
              <animate attributeName="stop-opacity" values="0;1" dur="0.3s" fill="freeze" />
            </stop>
          </linearGradient>
        </defs>
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          className={isFavorite ? 'filled' : ''}
        ></path>
      </svg>
     
    </button>
  );
};

export default FavoriteButton;
