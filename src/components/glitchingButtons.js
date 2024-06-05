import React, { useEffect, useState } from 'react';
import GlitchingButton from './glitchingButton';
import '../styles/button.css';
const GlitchingButtons = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const buttons = document.querySelectorAll('.btn');
    
    const glitchButton = () => {
      if (currentIndex !== null) {
        buttons[currentIndex].classList.remove('glitching');
      }
      const nextIndex = Math.floor(Math.random() * buttons.length);
      buttons[nextIndex].classList.add('glitching');
      setCurrentIndex(nextIndex);
    };

    const intervalId = setInterval(glitchButton, 3000); // Glitch every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <div class="containeer">
    <GlitchingButton name={"Search"}/>
    <GlitchingButton name={"Search"}/>
  <div class="radio-wrapper">
  
    <button class="btn" id="value-2" name="btn" type="button" onclick="toggleButton(this)" >
      _Radio<span aria-hidden="">_</span>
      <span class="btn__glitch" aria-hidden="">_R_a_d_i_o_</span>
      <label class="number">r2</label>
    </button>
  </div>
  <div class="radio-wrapper">
    <button class="btn" id="value-3" name="btn" type="button" onclick="toggleButton(this)">
      Buttons<span aria-hidden=""></span>
      <span class="btn__glitch" aria-hidden="">Buttons_</span>
      <label class="number">r3</label>
    </button>
  </div>
</div>





  );
};

export default GlitchingButtons;
