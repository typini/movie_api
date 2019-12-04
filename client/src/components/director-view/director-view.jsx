import React from 'react';
import './director-view.scss';

export class DirectorView extends React.Component {

  constructor(){
    super();
    this.state={};
  }

  render(){
    const { director } = this.props;
    if (!director) return <div>This is Null</div>;

    return (
      <div className="director-view">
        <div className="director-information">
          <div className="director-name">
            <span className="label">Name:&nbsp;</span>
            <span className="value">{director.name}</span>
          </div>
          <div className="director-birthyear">
            <span className="label">Birthdate:&nbsp;</span>
            <span className="value">{director.birthyear}{director.deathyear ? "-" + director.deathyear : ""}</span>
          </div>
          <div className="director-bio">
            <span className="label">Biography:&nbsp;</span>
            <span className="value">{director.bio}</span>
          </div>
        </div>
      </div>
    );
  }
}
