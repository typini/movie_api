import React from 'react';
import './director-view.scss';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';

export class DirectorView extends React.Component {

  constructor(){
    super();
    this.state={};
  }

  render(){
    const { director, movies } = this.props;
    console.log("*Movies:*" + movies);
    
    if (!director || director._id === ""){
      return (
        <Link to={`/`}>
          <Button variant="link">No Data! Go Back</Button>
        </Link>
      );
    }

    return (
      <div className="director-view">
        <Link to={`/`}>
          <Button variant="link">Back</Button>
        </Link>
        <div className="director-information">
          <div className="director-name">
            <span className="label">Name:&nbsp;</span>
            <span className="value">{director.name}</span>
          </div>
          <div className="director-birthyear">
            <span className="label">Birthdate:&nbsp;</span>
            <span className="value">{director.birthyear}</span>
          </div>
          <div className="director-deathyear">
            <span className="label">Deathdate:&nbsp;</span>
            <span className="value">{director.deathyear}</span>
          </div>
          <div className="director-bio">
            <span className="label">Biography:&nbsp;</span>
            <span className="value">{director.bio}</span>
          </div>
          <div className="director-movies">
            {movies.map(mov => <MovieCard key={mov._id} movie={mov} />)}
          </div>
        </div>
      </div>
    );
  }
}
