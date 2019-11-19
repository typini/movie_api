import React, { useState } from 'react';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
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
