import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;
    // AKA ES5:  var movie = this.props.movie;
    //        :  var onClick = this.props.onClick;
    //const { Button } = '../button/button';

    return (
      <Card style={{ width: '10rem' }}>
        <Card.Img variant="top" src={'http://www.tyreepini.com/webImages/'+movie.imageURL} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onClick(movie)} variant="link">Open</Button>
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
