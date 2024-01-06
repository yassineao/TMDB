import React, { Component } from 'react';

class MovieDetails extends Component {
  state = {
    movie: {}
  };

  componentDidMount(props) {
    const url = `https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=${this.props.apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({ movie: data });
      });
  }

  render() {
    const { movie } = this.state;

    return (
      <div>
        <h1>{movie.original_title} {movie.getFullYear}</h1>
      </div>
    );
  }
}

export default MovieDetails;
