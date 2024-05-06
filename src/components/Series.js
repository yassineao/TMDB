import React, { useState, useEffect } from 'react';
import "../styles/style.css"
import { getSeries } from '../api/getSeries';
import Card from './Card';
function Series() {
 

  const [series, setSeries] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const data = await getSeries();
      
      setSeries(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Movies:', error);
    }
  };








  // Function to check if the content is overflowing
  const isOverflowing = (element) => {
    return element.scrollHeight > element.clientHeight;
  };

  // Function to auto-scroll the movie_desc element to the end if it's overflowing
 
  useEffect(() => {
    fetchMovies();
  }, []);
  






  return (
    <div>
    <div className="card">
      {loading ? (
        <p>Loading...</p>
      ) : (
        series.results.slice(0, 20).map(serie => ( // Use slice(0, 20) to get only the first 20 movies
      <Card Type={"serie"} serie={serie} movie={null}/>
        ))
      )}
    </div>
  </div>
  
  );
}

export default Series;