
export const fetchGenres = async (type) => {
    const apiKey = '831a4bb8a39f71fea9d3c2efe8fb5ab2';
    const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`;
  
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.genres;
  };
  