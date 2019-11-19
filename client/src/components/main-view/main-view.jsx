import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      registerUser: false
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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  registerNewUser() {
    this.setState({
      registerUser: true
    });
  };

  onRegistration(user) {
    this.setState({
      user,
      registerUser: false
    });
  }

  onReturn() {
    this.setState({
      registerUser: false,
      user: null
    });
  }

  render() {
    //The following line is ES6 example
    const { movies, selectedMovie, user, registerUser } = this.state;
    //It replaces this from ES5...
    //var movies = this.state.movies;

    if(registerUser) return <RegistrationView onReturn={() => this.onReturn()} onRegistration={user => this.onRegistration(user)} />;

    if(!user) return <LoginView registerNewUser={() => this.registerNewUser()}  onLoggedIn={user => this.onLoggedIn(user)} />;

    if(!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
      <button className="log-out" type="button" onClick={() => this.onReturn()}>Log Out</button>
      {selectedMovie
        ? <MovieView movie={selectedMovie} onClick={() =>this.onMovieClick(null)} />
        : movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
      ))}
      </div>
    );
  }
}
