import React from 'react';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <button onClick={() => onClick(null)}>back</button><br />
        <img className="movie-poster" src={'http://www.tyreepini.com/webImages/' + movie.imageURL} height="240px"/>
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
    );
  }
}
