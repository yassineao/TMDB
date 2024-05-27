const apiKey = '831a4bb8a39f71fea9d3c2efe8fb5ab2';

export const fetchMovieDetails = async (Id, type) => {
    var mergedJsonresult,response2 ,response =null;
     
    
    try {
        if(type==="movie"){
            response = await fetch(`https://api.themoviedb.org/3/movie/${Id}?api_key=${apiKey}&append_to_response=videos`);
         

            
        console.log("response,dpdöfk",response)
       }
       else{
           console.log("pepepepep");
            response = await fetch(`https://api.themoviedb.org/3/tv/${Id}?api_key=${apiKey}&append_to_response=videos`);

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
