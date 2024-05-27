export const getPoster = async (Type, Id) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/${Type}/${Id}/images?api_key=831a4bb8a39f71fea9d3c2efe8fb5ab2`);
    const data = await response.json();

    const filterCriteria = image => image.vote_average > 5;

    const filteredData = {
      ...data,
      posters: data.posters.filter(filterCriteria),
      backdrops: data.backdrops.filter(filterCriteria)
    };

    return filteredData;
  } catch (error) {
    throw new Error("Problem fetching images");
  }
};
