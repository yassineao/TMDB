import React from 'react';

const API_KEY = 'e3436ec42b993f82543c9bdaa01a5e45';

function MoviePoster({ movieId }) {
  const [posterUrl, setPosterUrl] = React.useState(null);

  React.useEffect(() => {
    async function fetchPosterUrl() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`
        );
        const data = await response.json();

        // Check if the posters array is not empty and has at least one element.
        if (data.posters && data.posters.length > 0) {
          setPosterUrl(data.posters[0].file_path);
        } else {
          console.error('No poster found for this movie.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchPosterUrl();
  }, [movieId]);

  if (!posterUrl) {
    return null;
  }

  return (
    <div>
      <img className="locandina" src={`https://image.tmdb.org/t/p/w500${posterUrl}`} alt="nice" />
    </div>
  );
}

export default MoviePoster;
