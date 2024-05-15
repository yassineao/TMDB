import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nbar.css';
import { getMovies } from '../api/getMovies';
import Cover  from '../components/Cover';

import getToken from '../api/getTokenU';
function Home() {
  const [userData, setUserData] = useState(null); 
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const fetchMovies = async () => {
    try {
      const data = await getMovies();
      
      setMovies(data);
      console.log('Movie Dawwwta:', data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Movies:', error);
    }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getToken();
        setUserData(user); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); 
    fetchMovies();
    
  }, []);
  return (
    <div className="app-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        movies.results.slice(0, 5).map(movie => ( // Use slice(0, 20) to get only the first 20 movies
        <Section
       id="first"
       title={movie.title}
       className="first"
       nid={movie.id}
       bgUrl={movie.id}
     />
     
        ))
      )}
    <section className="S1">
    
     </section>
     
      {userData && (
        <div>
          <h1 className="titles">Welcome !!</h1>
          <h2 className="titles"> {userData.lastname}</h2>
        </div>
      )}
      
        <section>

        <h1 className="titles">Welcome !!</h1>

        </section>
        <section>


          
        </section>
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



function Section ({ id, title, className, bgUrl, nid })  {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="wrapper-outer">
        <div className="wrapper-inner">
          <div
            className="background"
            style={{ backgroundImage: `url(${bgUrl})` }}
          >
            <h2 className="section-title">{title}</h2>
            <Cover className="background" Type="movie" Id={nid} number={2} />
          </div>
        </div>
      </div>
    </section>
  );
};


export default Home;
