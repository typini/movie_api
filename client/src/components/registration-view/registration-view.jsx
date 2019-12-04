import React, { useState } from 'react';
import './registration-view.scss';

import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword ] = useState('');
  const [rPassword, setRPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://reelcreationsdb.herokuapp.com/users', {
      username: username,
      password: password,
      email: email,
      birth_date: birth_date
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error registering the user')
    });
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
