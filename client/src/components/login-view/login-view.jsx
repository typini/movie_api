import React, { useState } from 'react';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

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
      <Form.Group controlId="formBasicPassword">
        <Form.Label>
          Password:&nbsp;
        </Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="link" type="submit" onClick={handleSubmit}>Submit</Button>
      <Link to={`/register`}>
        <Button variant="link">Register A New User</Button>
      </Link>
    </Form>
   </div>
  );

}
