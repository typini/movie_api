import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './profile-view.scss';
import { MovieCard } from '../movie-card/movie-card';

export function ProfileView(props) {
  if (!localStorage.getItem('user') || !localStorage.getItem('token')){
    return (
      <div className="error-message">Please log in again.
        <Link to={`/`}>
          <Button variant="link">Log In</Button>
        </Link>
      </div>);
  }

  let movieArray = localStorage.getItem('favoritesList').split(',');
  let setFMovies = [];

  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthdate, setBirthdate ] = useState('');
  const [ nPassword, setNPassword ] = useState('');
  const [ nSPassword, setNSPassword ] = useState('');
  const [ movieArrayElements, setMovieArrayElements ] = useState('');

  const checkFavorites = i => {
    console.log(i + " " + i._id + " : " + movieArray.includes(i._id));
    return movieArray.includes(i._id);
  }

  const getFavoriteMovies = (token) => {
    axios.get('https://reelcreationsdb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      setFMovies = response.data.filter(checkFavorites);
      setMovieArrayElements(setFMovies.map(item => 
        <MovieCard key={item._id} movie={item}/>
      ));
    })
    .catch(error => {
      console.error(error);
    });
  }

  const getAccountInfo = (token) => {
    axios.get('https://reelcreationsdb.herokuapp.com/users/'+username, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(res => {
      console.log(res);
      setName(res.data.name || '');
      setEmail(res.data.email || '');
      setBirthdate(res.data.birth_date || '');
    })
    .catch (err => {
      console.error("Error: " + err);
    });
  }

  useEffect(() => {
    getAccountInfo();
    getFavoriteMovies(token);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch('https://reelcreationsdb.herokuapp.com/users/'+username, {
      username: username,
      name: name,
      email: email,
      birth_date: birthdate,
      newPassword: nPassword,
      newSPassword: nSPassword
    })
    .then(res => {
      const data = res.data;
      console.log("You just modified " + username + ".  See details below.");
      console.log(data);
    })
    .catch(err => {
      console.error('Error: ' + err);
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete('https://reelcreationsdb.herokuapp.com/users/'+username, {
      data: {username: username}
    })
    .then(res => {
      const data = res.data;
      console.log(username + " deleted.");
    })
    .catch(err => {
      console.error('Error: ' + err);
    });
    props.onReturn();
  };

  return (
    <div>
      <Link to={`/`}>
        <Button variant="link">Back to Main</Button>
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
          <Form.Control placeholder="Enter New Password -or- leave blank" type="password" onChange={e => setNPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicSPassword" className="user-field">
          <Form.Label>Re-enter New Password:&nbsp;</Form.Label>
          <Form.Control placeholder="Re-enter New Password" type="password" onChange={e => setNSPassword(e.target.value)} />
        </Form.Group>

        <br />

        <Button variant="link" className="submit-button" type="submit" onClick={handleSubmit}>
          Submit Changes
        </Button>
        <Button variant="link" className="delete-user-button" type="cancel" onClick={handleDelete}>
          Delete Profile
        </Button>
        <Form.Group controlId="formBasicsFavorites">
          <Form.Label>Favorite Movies:&nbsp;</Form.Label>
          <div>{movieArrayElements}</div>
        </Form.Group>
      </Form>
    </div>
  );
}

