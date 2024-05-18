export const getMovies = async () => {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=831a4bb8a39f71fea9d3c2efe8fb5ab2');
        const data = await response.json();
        
        // Filter out movies with an empty overview
        const filteredMovies = data.results.filter(movie => movie.overview && movie.overview.trim() !== '');
        
        console.log("Filtered Movies", filteredMovies);
        
        return { ...data, results: filteredMovies };
    }
    catch (error) {
        throw new Error("Problem by fetching");
    }
}