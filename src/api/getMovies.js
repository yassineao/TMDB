import React, { useState, useEffect } from 'react';
import "../styles/style.css";
import SeriePoster from '../components/imageSerie';
import SerieDetails from '../components/detailsSerie';

const PopularSeries = () => {
  // State Initialization
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  // componentDidMount equivalent using useEffect
  useEffect(() => {
    // Simulating componentDidMount logic
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/tv/popular?api_key=e3436ec42b993f82543c9bdaa01a5e45'
        );
        const data = await response.json();
        setSeries(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

    // Simulating componentWillUnmount logic
    return () => {
      // Cleanup logic (e.g., cancel ongoing requests) can be placed here
      // This runs when the component is unmounted
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // componentDidUpdate equivalent using useEffect
  useEffect(() => {
    // Simulating componentDidUpdate logic
    // This runs every time 'series' is updated
    // You can add logic here for any side-effects on update
  }, [series]);

  // Render method
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render series components
  return (
    <div className="container">
      {series.map((serie) => (
        <div className="item" key={serie.id}>
          <SeriePoster SerieId={serie.id} />
          <SerieDetails SerieId={serie.id} apiKey='e3436ec42b993f82543c9bdaa01a5e45' />
        </div>
      ))}
    </div>
  );
};

export default PopularSeries;
