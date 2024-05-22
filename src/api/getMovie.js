var item=null;
const fetchMovieDetails = async ({Id,t}) => {
    try {
        if(t==="movie"){
             response = await fetch(`https://api.themoviedb.org/3/movie/${Id}?api_key=${apiKey}`);
             console.log("89898989898");

        }
        else{
            console.log("pepepepep");
             response = await fetch(`https://api.themoviedb.org/3/tv/${Id}?api_key=${apiKey}`);

        }
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        var item = await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
};


export default item;