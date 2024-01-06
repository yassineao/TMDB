
import React from 'react';
import axios from 'axios';
import MovieDetails from './details';
class FilmPoster extends React.Component {
  state = {
    film: null,
  }

  componentDidMount() {
    // Fetch film data from TMDB API
    axios.get(`https://api.themoviedb.org/3/movie/${this.props.movie.id}?api_key=e3436ec42b993f82543c9bdaa01a5e45`)
      .then(res => {
        this.setState({ film: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { film } = this.state;
    if (!film) return null;

    return (
      <div >
        <div class="slider">
        <div class="box1 box" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${film.backdrop_path})` }} >
                              <div class="bg"></div>
                              <div class="details">
                                  <h1>{this.props.movie.title}</h1>
                                  <h1>{this.props.movie.id}</h1>
                                  <p>
                                  <div>
                                      <MovieDetails movieId={this.props.movie.id} apiKey='e3436ec42b993f82543c9bdaa01a5e45' />
                              </div>
                              </p>
                            <button>Check Now</button>
                        </div>

                    <div class="illustration"><div class="inner"></div></div>
                </div>
      </div>
      </div>
    );
  }
}

export default FilmPoster;