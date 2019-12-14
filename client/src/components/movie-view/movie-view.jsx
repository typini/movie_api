import React from 'react';
import './movie-view.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, genre, director } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <Link to={`/`}>
          <Button variant="link">Back to Main</Button>
        </Link>
        <img className="movie-poster" src={'http://www.tyreepini.com/webImages/' + movie.imageURL} />
        <div className="movie-information">
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre Code: </span>
            <Link to={`/genres/${movie.Genre}`}>
              <Button className="value">{movie.Genre}</Button>
            </Link>
          </div>
          <div className="movie-director">
            <span className="label">Director Code: </span>
            <Link to={`/directors/${movie.Director}`}>
              <Button className="value">{movie.Director}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
