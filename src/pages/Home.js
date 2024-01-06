import React from 'react';


import "../styles/Cards.css"
import "../styles/Nbar.css"



import { Link } from 'react-router-dom';
function Home() {
    return (
      <div>
        <main class="page-content">
          <div class="cardT">
            <div class="content" >
              <h2 class="title">Popular Movies</h2>
              <p class="copy">Check out all the new popular movies</p>
              <button class="btn"><Link to="/popularFilm">Popular movies</Link></button>
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