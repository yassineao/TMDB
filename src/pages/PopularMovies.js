
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Movies from '../components/Movies';

import "../styles/Cards.css"
import "../styles/Nbar.css"



function PopularMovies() {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get the token from the cookie
    const storedToken = Cookies.get('token');
    if (storedToken) {
      // Token found in the cookie
      setToken(storedToken);
    } else {
      // Token not found in the cookie
      console.log('Token not found');
    }
  }, []); 


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