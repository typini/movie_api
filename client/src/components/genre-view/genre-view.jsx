import React from 'react';
import './genre-view.scss';

export class GenreView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { genre } = this.props;
    if (!genre) return null;

    return (
      <div className="genre-view">
        <div className="genre-information">
          <div className="genre-name">
            <span className="label">Genre: </span>
            <span className="value">{genre.name}</span>
          </div>
          <div className="genre-desc">
            <span className="label">Description: </span>
            <span className="value">{genre.desc}</span>
          </div>
        </div>
      </div>
    );
  }
}
