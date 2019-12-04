import React from 'react';
import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { user } = this.props;
    return (
      <div>You will come back to this and finish it!</div>
    );
  }
}
