import React, { useState } from 'react';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');
  const [rPassword, setRPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onRegistration(username);
    /* Send a request to the server to register a new user */
    /* then have the user log-in with their new credentials  */
  };

  const handleCancel = (e) => {
    console.log("Registration Request Cancelled.");
    props.onReturn();
  };

  return (
    <div className="registration">
    <h1 className="register-prompt">Register a New User</h1>
    <form>
      <label>
        New Username:&nbsp;
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        New Password:&nbsp;
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Retype Password:&nbsp;
        <input type="password" value={rPassword} onChange={e => setRPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
    </div>
  );
}
