

var response =null;

export const fetch = async (Id, type, what) => {
    try {
        if(type==="movie"){
            response = await fetch(`https://api.themoviedb.org/3/movie/${Id}/${what}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`);
            console.log("89898989898");

       }
       else{
           console.log("pepepepep");
            response = await fetch(`https://api.themoviedb.org/3/tv/${Id}/similar?api_key=${apiKey}`);

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


