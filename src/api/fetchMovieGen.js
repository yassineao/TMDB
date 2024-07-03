
export  const fetchMGenres = async (type,genreId) => {
    const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&with_genres=${genreId}`;
    console.log(type)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  };
  