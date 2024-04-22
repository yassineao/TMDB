
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MovieList from '../components/favMovie';

import "../styles/Cards.css"
import "../styles/Nbar.css"
import { getFav } from '../api/getFavorite';

function FavMovies() {
    
  useEffect(() => {
  }, []); 


    return (
      <div>
           <div>
                            <h1 class="titles">Your favorite movies </h1>
                          <div class="card">
                            <MovieList />





                           </div>
                           </div>
      </div>


    );
  }
  
  export default FavMovies;