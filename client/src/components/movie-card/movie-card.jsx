import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMovieFavorite: false
    };
  }

  handleFavorite(mId) {
    this.setState(prevState => ({ isMovieFavorite: !prevState.isMovieFavorite }));
    localStorage.setItem('favoritesList', mId);
    this.props.ptf();
  }

  render() {
    const { movie } = this.props;
    const { isMovieFavorite } = this.state;
    // AKA ES5:  var movie = this.props.movie;
    //const { Button } = '../button/button';

    return (
      <Card style={{ width: '10rem' }}>
        <Card.Img className={`${isMovieFavorite ? "favorite" : ""}`} variant="top" src={'http://www.tyreepini.com/webImages/'+movie.imageURL} onClick={()=>this.handleFavorite(movie._id)} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          <Link to={`/directors/${movie.Director}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie:  PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
  }).isRequired
};
