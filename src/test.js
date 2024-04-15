
const { getMovies } = require('./api/getMovies');
const test = async () => {
  try {
    const users = await getMovies();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

test();