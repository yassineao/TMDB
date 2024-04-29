import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router,  Link } from 'react-router-dom';

import getToken from './api/getTokenU';
import './styles/navigation.css';
import RouteComponent from './components/Router';
import test from './pages/Test';
function App() {
  const [userData, setUserData] = useState(null); // State to hold user data

  const logout = () => {
    // Clear session storage or cookies
    sessionStorage.removeItem('session');
    // Redirect to the login page or any other desired page
    window.location.href = '/login'; // Redirect to the login page after logout
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the getToken function to fetch user data
        const user = await getToken();
        setUserData(user); // Set user data to state
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, []); // Run the effect only once when the component mounts

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
            <Link to="/test" className="nav-link"><span className="nav-link-span"><span className="u-nav">Popular Movies</span></span></Link>

              <Link to="/popularMovies" className="nav-link"><span className="nav-link-span"><span className="u-nav">Popular Movies</span></span></Link>
              <Link to="/popularSerie" className="nav-link"><span className="nav-link-span"><span className="u-nav">Popular Series</span></span></Link>
              {userData ? (
                <>
                  <Link to="/profile" className="nav-link"><span className="nav-link-span"><span className="u-nav">Profile</span></span></Link>
                  <Link to="/favmovies" className="nav-link"><span className="nav-link-span"><span className="u-nav">Watchlist</span></span></Link>

                  <Link to="/logout" onClick={logout} className="nav-link"><span className="nav-link-span"><span className="u-nav">Logout</span></span></Link>
                </>
              ) : (
                <Link to="/signup" className="nav-link"><span className="nav-link-span"><span className="u-nav">Login</span></span></Link>
              )}
              <Link to="/Search" className="nav-link"><span className="nav-link-span"><span className="u-nav">Search</span></span></Link>
            </div>
          </nav>
        </header>
      </Router>
    </div>
  );
}

export default App;
