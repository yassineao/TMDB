export const  getSeries = async () => {
    
    try {
        const response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=831a4bb8a39f71fea9d3c2efe8fb5ab2');
        const data = await response.json();
        return data
    
    }
    catch (error){
        throw new  Error("Problem by fetching");
    }
    
    }