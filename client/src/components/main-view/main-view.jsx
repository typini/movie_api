import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null
    };
  }

  componentDidMount() {
    axios.get('https://reelcreationsdb.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error){
      console.log(error);
    });
  }

  onMovieClick(movie){
    this.setState({
      selectedMovie: movie
    });
  }

  render() {
    //The following line is ES6 example
    const { movies, selectedMovie } = this.state;
    //It replaces this from ES5...
    //var movies = this.state.movies;

    if(!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
      {selectedMovie
        ? <MovieView movie={selectedMovie} onClick={() =>this.onMovieClick(null)} />
        : movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
      ))}
      </div>
    );
  }
}
