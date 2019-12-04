import React, { useState } from 'react';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://reelcreationsdb.herokuapp.com/login', {
      username: username,
      password: password
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
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>
          Username:&nbsp;
        </Form.Label>
        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Password:&nbsp;
        </Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button variant="primary" type="button" onClick={handleRequest}>Register A New User</Button>
    </Form>
   </div>
  );

}
