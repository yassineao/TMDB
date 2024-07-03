
export  const fetchGenres = async (type) => {
    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.genres;
  };
  