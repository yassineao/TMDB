
const apiKey = '831a4bb8a39f71fea9d3c2efe8fb5ab2';
export const fetchCastDetails = async (Id, type) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${Id}/credits?api_key=${apiKey}`);
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
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${Id}/similar?api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch similar movies');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching similar movies:', error);
        throw error;
    }
};