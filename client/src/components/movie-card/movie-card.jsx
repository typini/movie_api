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
    let a = localStorage.getItem('favoritesList') || [];
    if (a.indexOf(this.props.movie._id) === -1) {
      this.state = {
        isMovieFavorite: false
      }
    } else {
      this.state = {
        isMovieFavorite: true
      }
    }
  }

  ptDB(favoritesArray){
    console.log('Patching to Database');
    console.log(favoritesArray);
    console.log(typeof favoritesArray);
    let u = localStorage.getItem('user');
    axios.patch('https://reelcreationsdb.herokuapp.com/favorites/'+u, {
      favorites: favoritesArray
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  handleFavorite(mId) {
    let storageArray = localStorage.getItem('favoritesList').split(",");
    if (storageArray.indexOf(mId) === -1){
      this.setState({isMovieFavorite: true});
      let tempList = [];
      tempList.push(mId);
      storageArray.push(tempList[0]);
    } else {
      this.setState({isMovieFavorite: false});
      console.log("Already on the list.");
      storageArray.splice(storageArray.indexOf(mId), 1);
    }
    localStorage.setItem('favoritesList', storageArray.toString());
    this.ptDB(storageArray);
  }

  render() {
    const { movie } = this.props;
    const { isMovieFavorite } = this.state;
    // AKA ES5:  var movie = this.props.movie;
    //const { Button } = '../button/button';

    return (
      <Card style={{ width: '11.5rem' }}>
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
