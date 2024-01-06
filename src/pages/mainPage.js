import { Link ,Routes, Route } from "react-router-dom"
import Home from "./Home"
import PopSer from "../api/PopularSeries";
import PopMov from '../api/App';
import Search from "../api/theSearch"

import React from 'react';

import MovieDetails from '../components/genres';



import "../styles/navigation.css"

function App() {
  return (

    <div className="App">
     <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/popularFilm" element={ <PopMov/> } />
            <Route path="popularSerie" element={ <PopSer/> } />
             <Route path="Search" element={ <Search/> } />
        </Routes>
    <header id="nav-wrapper">
       <nav id="nav">
         <div class="nav left">
           <span class="gradient skew"><h1 class="logo un-skew"><a href="/">Movierito</a></h1></span>
           <button id="menu" class="btn-nav"><span class="fas fa-bars"></span></button>
         </div>

         <div class="nav right">
           <a href="/popularFilm" class="nav-link "><span class="nav-link-span"><span class="u-nav">Popular Movies</span></span></a>
           <a href="popularSerie" class="nav-link"><span class="nav-link-span"><span class="u-nav">Popular Series</span></span></a>
           <a href="Search" class="nav-link"><span class="nav-link-span"><span class="u-nav">Search</span></span></a>

         </div>
       </nav>
     </header>





    </div>
  )
}

export default App