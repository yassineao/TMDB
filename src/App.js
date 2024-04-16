import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import './styles/navigation.css';
import RouteComponent from './components/Router';

function App() {
  return (
    <div className="App">
      <Router>
        <RouteComponent/>

        <header id="nav-wrapper">
          <nav id="nav">
            <div className="nav left">
              <span className="gradient skew"><h1 className="logo un-skew"><Link to="/">Movierito</Link></h1></span>
              <button id="menu" className="btn-nav"><span className="fas fa-bars"></span></button>
            </div>

            <div className="nav right">
              <Link to="/popularMovies" className="nav-link"><span className="nav-link-span"><span className="u-nav">Popular Movies</span></span></Link>
              <Link to="/popularSerie" className="nav-link"><span className="nav-link-span"><span className="u-nav">Popular Series</span></span></Link>
              <Link to="/signup" className="nav-link"><span className="nav-link-span"><span className="u-nav">Login</span></span></Link>
              <Link to="/Search" className="nav-link"><span className="nav-link-span"><span className="u-nav">Search</span></span></Link>

            </div>
            
          </nav>
        </header>
      </Router>
    </div>
  );
}

export default App;
