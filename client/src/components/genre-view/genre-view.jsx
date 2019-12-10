import React from 'react';
import './genre-view.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

export class GenreView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;
    if (!genre) return null;

    return (
      <div className="genre-view">
        <Link to={`/`}>
          <Button variant="link">Back</Button>
        </Link>
        <div className="genre-information">
          <div className="genre-name">
            <span className="label">Genre: </span>
            <span className="value">{genre.name}</span>
          </div>
          <div className="genre-desc">
            <span className="label">Description: </span>
            <span className="value">{genre.description}</span>
          </div>
          <div className="genre-movies">
            {movies.map(mov => <MovieCard key={mov._id} movie={mov} />)}
          </div>
        </div>
      </div>
    );
  }
}
