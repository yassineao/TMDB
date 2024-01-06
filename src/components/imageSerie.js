import React from 'react';

const API_KEY = 'e3436ec42b993f82543c9bdaa01a5e45';

function SeriePoster({ SerieId }) {
  const [posterUrl, setPosterUrl] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    async function fetchPosterUrl() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${SerieId}/images?api_key=${API_KEY}`
        );

        if (!isMounted) {
          // If the component is unmounted, do not update the state
          return;
        }

        const data = await response.json();
        if (data.posters && data.posters.length > 0) {
          setPosterUrl(data.posters[0].file_path);
        } else {
          setPosterUrl('./lorenzo-herrera-p0j-mE6mGo4-unsplash.jpg');
        }
      } catch (error) {
        // Handle fetch errors if needed
        console.error('Error fetching poster URL:', error);
      }
    }

    fetchPosterUrl();

    // Cleanup function to cancel the fetch request when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [SerieId]);

  if (!posterUrl) {
    return null;
  }

  return (
    <div>
      <img className="locandina" src={`https://image.tmdb.org/t/p/w500${posterUrl}`} alt="nice" />
    </div>
  );
}

export default SeriePoster;
