import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';

export function ProfileView(props) {
  if (!localStorage.getItem('user') || !localStorage.getItem('token')){
    return (
      <div className="error-message">Please log in again.
        <Link to={`/`}>
          <Button variant="link">Log In</Button>
        </Link>
      </div>);
  }

  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const [ userId, setUserId ] = useState('');
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthdate, setBirthdate ] = useState('');
  const [ nPassword, setNPassword ] = useState('');
  const [ nSPassword, setNSPassword ] = useState('');

  const getAccountInfo = (token) => {
    axios.get('https://reelcreationsdb.herokuapp.com/users/'+username, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(res => {
      console.log(res);
      setUserId(res.data._id);
      setName(res.data.name || '');
      setEmail(res.data.email || '');
      setBirthdate(res.data.birth_date || '');
    })
    .catch (err => {
      console.error("Error: " + err);
    });
  }

  useEffect(() => { getAccountInfo(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch('https://reelcreationsdb.herokuapp.com/users/'+userId, {
      username: username,
      name: name,
      email: email,
      birth_date: birthdate,
      newPassword: nPassword,
      newSPassword: nSPassword
    })
    .then(res => {
      const data = res.data;
      console.log(data);
    })
    .catch(err => {
      console.error('Error: ' + err);
    });
  };

  return (
    <div>
      <Link to={`/`}>
        <Button variant="link">Back</Button>
      </Link>
      {/*<form className="update-profile" onSubmit={this.handleSubmit>*/}
      <Form className="update-profile">

        <Form.Group controlId="formBasicUsernameDisabled" className="user-field">
          <Form.Label>Username:&nbsp;</Form.Label>
          <Form.Control placeholder="Enter username" value={username} type="text" readOnly />
        </Form.Group>

        <Form.Group controlId="formBasicName" className="user-field">
          <Form.Label>Name:&nbsp;</Form.Label>
          <Form.Control placeholder="Enter name" value={name} type="text" onChange={e => setName(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="user-field">
          <Form.Label>Email:&nbsp;</Form.Label>
          <Form.Control placeholder="Enter Email" value={email} type="text" onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicBirthdate" className="user-field">
          <Form.Label>Birthdate:&nbsp;</Form.Label>
          <Form.Control placeholder="Enter birthdate" value={birthdate} type="text" onChange={e => setBirthdate(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="user-field">
          <Form.Label>New Password:&nbsp;</Form.Label>
          <Form.Control placeholder="Enter New Password" type="password" onChange={e => setNPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicSPassword" className="user-field">
          <Form.Label>Re-enter New Password:&nbsp;</Form.Label>
          <Form.Control placeholder="Re-enter New Password" type="password" onChange={e => setNSPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" className="submit-button" type="submit" onClick={handleSubmit}>
          Submit Changes
        </Button>
      </Form>
    </div>
  );
}

