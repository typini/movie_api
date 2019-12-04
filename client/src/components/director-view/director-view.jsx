import React from 'react';
import './director-view.scss';

export class DirectorView extends React.Component {

  constructor(){
    super();
    this.state={};
  }

  render(){
    const { director } = this.props;
    if (!director) return null;

    return (
      <div className="director-view">
        <img className="director-photo" src={'http://www.tyreepini.com/webImages/' + director.photoURL} />
        <div className="director-information">
          <div className="director-name">
            <span className="label">Name: </span>
            <span className="value">{director.Name}</span>
          </div>
          <div className="director-birthdate">
            <span className="label">Birthdate: </span>
            <span className="value">{director.Birthdate}</span>
          </div>
          <div className="director-bio">
            <span className="label">Biography: </span>
            <span className="value">{director.bio}</span>
          </div>
        </div>
      </div>
    );
  }
}
