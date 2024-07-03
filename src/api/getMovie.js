
export const fetchMovieDetails = async (Id, type) => {
    var mergedJsonresult,response2 ,response =null;
     
    
    try {
        if(type==="movie"){
            response = await fetch(`https://api.themoviedb.org/3/movie/${Id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=videos`);
         

            
        console.log("response,dpdöfk",response)
       }
       else{
           console.log("pepepepep");
            response = await fetch(`https://api.themoviedb.org/3/tv/${Id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=videos`);

       }
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};
