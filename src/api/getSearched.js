export const getSearched = async (Type , query ) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/${Type}?api_key=831a4bb8a39f71fea9d3c2efe8fb5ab2&language=en-US&query=${query}
      `);
      const data = await response.json();
      
      return data;
    } catch (error) {
      throw new Error("Problem fetching poster");
    }
  };
  