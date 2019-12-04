import React from 'react';
import axios from 'axios';

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
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });
    
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
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


  onReturn() {
    this.setState({
      registerUser: false,
      user: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    //The following line is ES6 example
    const { movies, user } = this.state;
    //It replaces this from ES5...
    //var movies = this.state.movies;

    if(!movies) return <div className="main-view"/>;

    return (
      <Router>
        <div className="main-view">
          <span>{localStorage.getItem('user')}</span>
          <button className="log-out" type="button" onClick={() => this.onReturn()}>Log Out</button>
          <Route exact path="/" render={() => {
            if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m}/>)
            }
          }/>
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/users/:userId" render={() => <UserProfileView /> } />
          <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <GenreView genre={movies.find(m=>m.Genres.Name === match.params.name).Genre}/>}
          } />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view"/>;
            return <DirectorView director={movies.find(m=>m.Director.Name === match.params.name).Director}/>}
          } />
        </div>
      </Router>
    );
  }
}
