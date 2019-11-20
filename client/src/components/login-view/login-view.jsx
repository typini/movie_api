import React, { useState } from 'react';
import './login-view.scss';

import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://reelcreationsdb.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('No such user.');
    });
  };

  const handleRequest = (e) => {
    props.registerNewUser();
  };

  return (
   <div className="login">
    <h1 className="welcome">Welcome to ReelCreationsDB</h1>
    <form>
      <label>
        Username:&nbsp;
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:&nbsp;
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
      <button type="button" onClick={handleRequest}>Register A New User</button>
    </form>
   </div>
  );

}
