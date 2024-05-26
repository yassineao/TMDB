const apiKey = '831a4bb8a39f71fea9d3c2efe8fb5ab2';

export const fetchVideo = async (Id, type) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${Id}/videos?api_key=831a4bb8a39f71fea9d3c2efe8fb5ab2`);
        const data = await response.json();
        

        // Filter out movies with an empty overview
       
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        console.log("lalalalaalal",data)
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};