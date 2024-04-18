import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Cards.css';
import '../styles/Nbar.css';
import fetchData from '../api/getConnected,js';
function Home() {
  const [userData, setUserData] = useState(null); // State to hold user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/protected', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('session')}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        setUserData(data.user); // Set user data to state
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, []); // Run the effect only once when the component mounts

  return (
    <div>
      {userData && (
        <div>
          <h1 class="titles">Welcome !!</h1>
          <h2 class="titles"> {userData.lastname}</h2>
          {/* Render other user information as needed */}
        </div>
      )}
      <main className="page-content">
        <div className="cardT">
          <div className="content">
            <h2 className="title">Popular Movies</h2>
            <p className="copy">Check out all the new popular movies</p>
            <button className="btn">
              <Link to="/popularMovies">Popular movies</Link>
            </button>
          </div>
        </div>
        <div className="cardT">
          <div className="content">
            <h2 className="title">Popular series</h2>
            <p className="copy">Check out all the new popular series</p>
            <button className="btn">
              <Link to="/popularSerie">Popular series</Link>
            </button>
          </div>
        </div>
        <div className="cardT">
          <div className="content">
            <h2 className="title">Search movie</h2>
            <p className="copy">Check informations about a film </p>
            <button className="btn">
              <Link to="/search">Search</Link>
            </button>
          </div>
        </div>
      </main>
      
      
    </div>
  );
}

export default Home;
