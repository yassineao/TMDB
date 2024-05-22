const apiKey = '831a4bb8a39f71fea9d3c2efe8fb5ab2';

export const fetchMovieDetails = async (Id, type) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${Id}?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};
