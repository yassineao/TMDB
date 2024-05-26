
const apiKey = '831a4bb8a39f71fea9d3c2efe8fb5ab2';

var response =null;

export const fetch = async (Id, type, what) => {
    try {
        if(type==="movie"){
            response = await fetch(`https://api.themoviedb.org/3/movie/${Id}/${what}?api_key=${apiKey}`);
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


