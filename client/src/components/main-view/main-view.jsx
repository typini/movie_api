import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import { setDirectors } from '../../actions/actions';
import { setGenres } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
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
    this.setState({
      user: authData.user.username,
    });

    localStorage.setItem('favoritesList', authData.user.favorites || []);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);

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
      this.props.setMovies(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  getDirectors(token){
    axios.get('https://reelcreationsdb.herokuapp.com/directors', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setDirectors(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  getGenres(token){
    axios.get('https://reelcreationsdb.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setGenres(response.data);
    })
    .catch(error => {
      console.error(error);
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
    let { user } = this.state;
    let { movies, directors, genres } = this.props;
    //It replaces this from ES5...
    //var movies = this.state.movies;
    //etc.

    if(!movies) return <div className="main-view"/>;

    return (
      <Router basename="/client">
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
            return <MoviesList movies={movies}/>;
          }} />
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

let mapStateToProps = state => {
  return {
    movies: state.movies,
    directors: state.directors,
    genres: state.genres
  }
}

export default connect(mapStateToProps, { setMovies, setDirectors, setGenres } )(MainView);
