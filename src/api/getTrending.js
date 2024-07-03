export const  getTrending = async () => {
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);
        const data = await response.json();
        return data
    
    }
    catch (error){
        throw new  Error("Problem by fetching");
    }
    
    }