import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;
    // AKA ES5:  var movie = this.props.movie;
    //        :  var onClick = this.props.onClick;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
    );
  }
}
