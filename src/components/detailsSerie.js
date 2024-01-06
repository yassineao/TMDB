import React, { useState, useEffect } from 'react';

const SerieDetails = ({ SerieId }) => {
  const [serieDetails, setSerieDetails] = useState(null);
  const API_KEY = 'e3436ec42b993f82543c9bdaa01a5e45';

  useEffect(() => {
    const fetchSerieDetails = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${SerieId}?api_key=${API_KEY}`
      );
      const data = await response.json();
      setSerieDetails(data);
    };

    fetchSerieDetails();
  }, [SerieId]);

  if (!serieDetails) {
    return null;
  }

  return (
    <div>
      <p>Number of Seasons: {serieDetails.number_of_seasons}</p>

      {/* Additional details as needed */}
    </div>
  );
};

export default SerieDetails;