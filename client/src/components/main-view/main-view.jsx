import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      directors: [],
      genres: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getDirectors(accessToken);
      this.getGenres(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);

    localStorage.setItem('favoritesList', authData.user.favorites || []);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.setState({
      user: authData.user.username,
    });

    this.getMovies(authData.token);
    this.getDirectors(authData.token);
    this.getGenres(authData.token);
  }

  onRegistration(user) {
    this.setState({
      user,
      registerUser: false
    });
  }

  getMovies(token){
    axios.get('https://reelcreationsdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getDirectors(token){
    axios.get('https://reelcreationsdb.herokuapp.com/directors', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        directors: response.data
      });
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  getGenres(token){
    axios.get('https://reelcreationsdb.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        genres: response.data
      });
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  //onReturn is for Logging Out
  onReturn() {
    this.setState({
      token: null,
      user: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('favoritesList');
  }

  render() {
    //The following line is ES6 example
    const { movies, user, directors, genres } = this.state;
    //It replaces this from ES5...
    //var movies = this.state.movies;

    if(!movies) return <div className="main-view"/>;

    return (
      <Router>
        <div className="main-view">
          {user &&
            <Link to={`/users/${localStorage.getItem('user')}`}>
              <Button variant="link">{localStorage.getItem('user')}</Button>
            </Link>
          }
          {user &&
            <Link to={`/`}>
              <Button variant="link" type="button" onClick={() => this.onReturn()}>Log Out</Button>
            </Link>
          }
          <Route exact path="/" render={() => {
            if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />);
          }
          } />
          <Route path="/register" render={() =>
            <RegistrationView />
          } />
          <Route path="/users/:userId" render={() => 
            < ProfileView onReturn={() => this.onReturn()} />
          } />
          <Route path="/movies/:movieId" render={({match}) =>
            <MovieView
              movie={movies.find(m => m._id === match.params.movieId)}
            />
          } />
          <Route path="/genres/:genreId" render={({match}) => 
            <GenreView
              genre={genres.find(g => g._id === match.params.genreId)}
              movies={movies.filter(function(m) { return m.Genre === match.params.genreId})}
            />
          } />
          <Route path="/directors/:directorId" render={({ match }) => 
            <DirectorView
              director={directors.find(d => d._id === match.params.directorId)}
              movies={movies.filter(function(m) { return m.Director === match.params.directorId})}
            />
          } />
        </div>
      </Router>
    );
  }
}
