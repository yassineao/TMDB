export const getSearched = async (Type , query ) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/${Type}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${query}
      `);
      const data = await response.json();
      
      return data;
    } catch (error) {
      throw new Error("Problem fetching poster");
    }
  };
  