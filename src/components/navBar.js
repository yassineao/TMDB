
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ userData, logout }) => {
  return (
    <header id="nav-wrapper">
      <nav id="nav">
        <div className="nav left">
          <span className="gradient skew">
            <h1 className="logo un-skew">
              <Link to="/">Movierito</Link>
            </h1>
          </span>
          <button id="menu" className="btn-nav">
            <span className="fas fa-bars"></span>
          </button>
        </div>

        <div className="nav right">
          <Link to="/popularMovies" className="nav-link">
            <span className="nav-link-span">
              <span className="u-nav">Popular Movies</span>
            </span>
          </Link>
          <Link to="/popularSerie" className="nav-link">
            <span className="nav-link-span">
              <span className="u-nav">Popular Series</span>
            </span>
          </Link>
          <Link to="/genres" className="nav-link">
            <span className="nav-link-span">
              <span className="u-nav">Genres</span>
            </span>
          </Link>

          {userData ? (
            <>
              <Link to="/profile" className="nav-link">
                <span className="nav-link-span">
                  <span className="u-nav">Profile</span>
                </span>
              </Link>
              <Link to="/favmovies" className="nav-link">
                <span className="nav-link-span">
                  <span className="u-nav">Watchlist</span>
                </span>
              </Link>

              <Link to="/logout" onClick={logout} className="nav-link">
                <span className="nav-link-span">
                  <span className="u-nav">Logout</span>
                </span>
              </Link>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              <span className="nav-link-span">
                <span className="u-nav">Login</span>
              </span>
            </Link>
          )}
          <Link to="/Search" className="nav-link">
            <span className="nav-link-span">
              <span className="u-nav">Search</span>
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
