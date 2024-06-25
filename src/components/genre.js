import React, { useState, useEffect } from 'react';

import '../styles/Cardd.css';
import '../styles/glitch.css';
function Genre({ name, link }) {
    const [bgColor, setBgColor] = useState('');

    // Function to generate a random color
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
  
    useEffect(() => {
      // Set the background color when the component mounts
      setBgColor(getRandomColor());
    }, []);
    return (
        <div class="cardd">
  <div class="titlebar" style={{ backgroundColor: bgColor }}>
    <span class="buttons">
    <button class="minimize">
			<svg x="0px" y="0px" viewBox="0 0 10.2 1"><rect x="0" y="50%" width="10.2" height="1"></rect></svg>
		</button>
    <button class="maximize">
			<svg viewBox="0 0 10 10"><path d="M0,0v10h10V0H0z M9,9H1V1h8V9z"></path></svg>
		</button>
    <button class="close">
			<svg viewBox="0 0 10 10"><polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1"></polygon></svg>
		</button>
    </span>
  </div>
  <div class="cppcode">
  <div class="loader">
   <div data-gliitch={name} class="gliitch">{name}</div>
</div>
  </div>
</div>

    );
}

export default Genre;
