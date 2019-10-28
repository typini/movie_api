const express = require('express'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  bodyParser = require('body-parser'),
  passport = require('passport');

require('./passport');

const app = express();

const Movies = Models.Movie,
  Users = Models.User,
  Directors = Models.Director,
  Genres = Models.Genre;

mongoose.connect('mongodb://localhost:27017/ReelCreationsDB', {useNewUrlParser: true});

const movies = [
  {"title": "Schindler's List",
   "year": "1993"},
  {"title": "Wonder Woman",
   "year": "2017"},
  {"title": "Saving Private Ryan",
   "year": "1998"},
  {"title": "Amadeus",
   "year": "1984"},
  {"title": "Pan's Labyrinth",
   "year": "2006"},
  {"title": "Gandhi",
   "year": "1982"},
  {"title": "Empire of the Sun",
   "year": "1987"},
  {"title": "Love, Simon",
   "year": "2018"},
  {"title": "City Lights",
   "year": "1931"},
  {"title": "Murder on the Orient Express",
   "year": "2017"}
];

const genres = [
  {"name": "drama",
   "description": "Deep character conflict often never resolved."},
  {"name": "action",
   "description": "Characters acting without thinking, and somehow it works after things blow up."},
  {"name": "romantic comedy",
   "desciption": "Silly characters woo one another until they run out of reasons to say No to each other."}
];

const directors = [
  {"name":"Steven Spielberg",
   "bio":"An American filmmaker consider one of the founding pioneers of the New Hollywood era.",
   "birthYear":"1946",
   "deathYear":"na"},
  {"name":"Guillermo del Toro",
   "bio":"A Mexican filmmaker, author, and actor known for his Academy Award winning films Pan's Labyrinth and The Shape of Water",
   "birthYear":"1964",
   "deathYear":"na"},
  {"name":"Sir Charles Spencer Chaplin",
   "bio":"An English comic actor, filmmaker, and composer who rose to fame in the era of silent films.",
   "birthYear":"1889",
   "deathYear":"1977"},
  {"name":"Greg Berlanti",
   "bio":"An American writer, producer, and film director",
   "birthYear":"1972",
   "deathYear":"na"}
];

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());
var auth = require('./auth')(app);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/movies', passport.authenticate('jwt', {session: false}), function(req, res){
//  res.json(movies)
  Movies.find()
    .then(function(movies){
      res.status(201).json(movies);
    }).catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

app.get('/movies/:title', (req, res) => {
  res.json(movies.find( (movie) =>
  { return movie.title === req.params.title }));
});

app.get('/genres', (req, res) => {
  res.json(genres)
});

app.get('/genres/:name', (req, res) => {
  res.json(genres.find( (genre) =>
  { return genre.name === req.params.name }));
});

app.get('/directors', (req, res) => {
  res.json(directors)
});

app.get('/directors/:name', (req, res) => {
  res.json(directors.find( (director) =>
  { return director.name === req.params.name }));
});

app.get('/', function(req, res){
  res.send('Welcome to Reel Creations API')
});


app.get('/users', (req, res) => {
  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

app.get('/users/:username', (req, res) => {
  Users.findOne({username : req.params.username })
  .then(function(user){
    res.json(user);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

/* JSON format expected:
  {
    ID: Integer,
    username: String,
    name: String,
    password: String,
    email: String,
    birth_date: Date
  }
*/
app.post('/users', (req, res) => {
  //OLD res.send('We are working on posting users to the list.  It will be available soon.')
//  Users.findOne({ 'username' : req.body.username})
  Users.findOne({'name' : req.body.name})
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.username + ' already exists.');
    } else {
      Users
      .create({
        username: req.body.username,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        birth_date: req.body.birth_date
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error){
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

app.post('/movies', (req, res) => {
    //res.send('We are working on posting movies to the list.  This feature will be available soon.');
    Movies.findOne({ 'title': req.body.title })
    .then(function (movie) {
        if (movie) {
            return res.status(400).send(req.body.title + ' already exists.');
        } else {
            Movies
                .create({
                    title: req.body.title,
                    description: req.body.description,
                    genre: req.body.genre,
                    director: req.body.director,
                    actors: req.body.actors,
                    image_path: req.body.image_path,
                    featured: req.body.featured
                })
                .then(function (movie) { res.status(201).json(movie) })
                .catch(function (error) {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                })
        }
    }).catch(function (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

app.put('/users', (req, res) => {
  res.send('We are working on updating user info.  It will be available soon.')
});

app.post('/users/:id/:title', (req, res) => {
  res.send('We are working on favorites lists.  It will be available soon. RE: ' + req.params.id + ' and ' + req.params.title)
});

app.delete('/users/:id/:title', (req, res) => {
  res.send('We are working on favorites lists.  It will be available soon. RE: ' + req.params.id + ' and ' + req.params.title)
});

app.delete('/users/:id', (req, res) => {
  res.send('We are working on deleting users.  In the meantime you are eternal ours. Mwahahahahahaha! RE: ' + req.params.id)
});

app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);

