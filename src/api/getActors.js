

var response =null;
export const fetchCastDetails = async (Id, type) => {
    try {
        if(type==="movie"){
            response = await fetch(`https://api.themoviedb.org/3/movie/${Id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);
            console.log("89898989898");

       }
       else{
           console.log("pepepepep");
            response = await fetch(`https://api.themoviedb.org/3/tv/${Id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

       }
        if (!response.ok) {
            throw new Error('Failed to fetch cast details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cast details:', error);
        throw error;
    }
};
export const fetchSimilarMovies = async (Id, type) => {
    try {
        if(type==="movie"){
            response = await fetch(`https://api.themoviedb.org/3/movie/${Id}/similar?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);
            console.log("89898989898");

       }
       else{
           console.log("pepepepep");
            response = await fetch(`https://api.themoviedb.org/3/tv/${Id}/similar?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);

       }
        if (!response.ok) {
            throw new Error('Failed to fetch similar movies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        throw error;
    }
};



