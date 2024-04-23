import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cards.css';
import '../styles/Nbar.css';

import getToken from '../api/getTokenU';
function Home() {
  const [userData, setUserData] = useState(null); // State to hold user data

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
    <div>
      {userData && (
        <div>
          <h1 className="titles">Welcome !!</h1>
          <h2 className="titles"> {userData.lastname}</h2>
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
            <p className="copy">Check information about a film</p>
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
