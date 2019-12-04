import React from 'react';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
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
            <span className="value">{movie.Genre}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director Code: </span>
            <span className="value">{movie.Director}</span>
          </div>
        </div>
      </div>
    );
  }
}
