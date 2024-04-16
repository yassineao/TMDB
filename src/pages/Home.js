
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


import "../styles/Cards.css"
import "../styles/Nbar.css"


import { Link } from 'react-router-dom';
function Home() {
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
        <main class="page-content">
          <div class="cardT">
            <div class="content" >
              <h2 class="title">Popular Movies</h2>
              <p class="copy">Check out all the new popular movies</p>
              <button class="btn"><Link to="/popularMovies">Popular movies</Link></button>
            </div>
          </div>
          <div class="cardT">
            <div class="content">
               <h2 class="title">Popular series</h2>
               <p class="copy">Check out all the new popular series</p>
               <button class="btn"><Link to="/popularSerie">Popular series</Link></button>
            </div>
          </div>
          <div class="cardT">
            <div class="content">
              <h2 class="title">Search movie</h2>
              <p class="copy">Check informations about a film </p>
              <button class="btn"><Link to="/search">Search</Link></button>
            </div>
          </div>

        </main>

      </div>


    );
  }
  
  export default Home;