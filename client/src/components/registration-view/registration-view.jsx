import React, { useState } from 'react';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername ] = useState('');
  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [birthdate, setBirthdate ] = useState('');
  const [password, setPassword ] = useState('');
  const [rPassword, setRPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://reelcreationsdb.herokuapp.com/users', {
      username: username,
      password: password,
      email: email,
      birth_date: birthdate,
      password: password,
      rPassword: rPassword
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
    <Form>
      <Form.Group controlId="formRegistrationUsername">
        <Form.Label>
          New Username:&nbsp;
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formRegistrationName">
        <Form.Label>
          Your Name:&nbsp;
          <Form.Control type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formRegistrationEmail">
        <Form.Label>
          Your email address:&nbsp;
          <Form.Control type="text" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formRegistrationBirthdate">
        <Form.Label>
          Your Birthdate:&nbsp;
          <Form.Control type="text" placeholder="Enter your birthdate" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formRegistrationPassword">
        <Form.Label>
          Enter New Password:&nbsp;
          <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formRegistrationRPassword">
        <Form.Label>
          Retype Password:&nbsp;
          <Form.Control type="password" placeholder="Re-enter password" value={rPassword} onChange={e => setRPassword(e.target.value)} />
        </Form.Label>
      </Form.Group>
      <Form.Group controlId="formRegistrationButtons">
        <Button variant="link" type="submit" onClick={handleSubmit}>Submit</Button>
        <Link to={`/`}>
          <Button variant="link" type="cancel">Cancel</Button>
        </Link>
      </Form.Group>
    </Form>
    </div>
  );
}
