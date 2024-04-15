import React from 'react';
import Movies from '../components/Movies';

import "../styles/Cards.css"
import "../styles/Nbar.css"



function PopularMovies() {
    return (
      <div>
           <div>
                            <h1 class="titles">Popular movies </h1>
                          <div class="card">
                            <Movies/>





                           </div>
                           </div>
      </div>


    );
  }
  
  export default PopularMovies;