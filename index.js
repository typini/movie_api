const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  morgan = require('morgan'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  bodyParser = require('body-parser'),
  passport = require('passport');

const { check, validationResult } = require('express-validator');

require('./passport');

const app = express();
app.use(cors());  //further defined below.

/* //This CORS policy is for future development.
let allowedOrigins = ['http://localhost:8080', 'http://www.tyreepini.com/'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) == -1){
      let message = "The CORS policy for this application doesn't allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
});
*/

const Movies = Models.Movie,
  Users = Models.User,
  Directors = Models.Director,
  Genres = Models.Genre;

//MONGOOSE CONNECT
//This line left for local development:
//mongoose.connect('mongodb://localhost:27017/ReelCreationsDB', {useNewUrlParser: true});

//This line is for deployment on Heroku:
//NOTE**:  password is masked - Will not hard code passwords to a GitHub repository knowingly.
mongoose.connect('mongodb+srv://typini:th8vile@tyreepini-tuvz3.mongodb.net/ReelCreationsDB?retryWrites=true&w=majority', {useNewUrlParser: true});

app.use(morgan('common'));
app.use(express.static('public'));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use(bodyParser.json());
var auth = require('./auth')(app);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//I am adding this line to disallow anyone from making a call to "Movies" GET
app.get('/movies', passport.authenticate('jwt', {session: false}), function(req, res){
//app.get('/movies', function(req, res){
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
  //res.json(genres)
  Genres.find()
    .then(function(genres){
      res.status(201).json(genres);
    }).catch(function(error){
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

app.get('/genres/:id', (req, res) => {
  res.json(genres.find( (genre) =>
  { return genre._id === req.params.id }));
});


app.get('/directors', (req, res) => {
  //res.json(directors)
  Directors.find()
    .then(function(directors){
      res.status(201).json(directors);
    }).catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
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

/* Example JSON format expected in the code below:
  {
    username: String,
    name: String,
    password: String,
    email: String,
    birth_date: String // <-- Note that javascript dates are strings
  }
*/
app.post('/users',
  //OLD res.send('We are working on posting users to the list.  It will be available soon.')
//  Users.findOne({ 'username' : req.body.username})
  [check('username', 'Username of 3 or more characters is required').isLength({min: 3}),
  check('username', 'Username contains non alphanumeric character - not allowed.').isAlphanumeric(),
  check('password', 'password is required').not().isEmpty(),
  check('rPassword', 'repeated password is required').not().isEmpty(),
  check('email', 'Email does not appear to be valid').isEmail()], (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({errors: errors.array() });
    }
    if (req.body.password != req.body.rPassword){
      return res.status(422).json({errors: "Passwords do not match"});
    }

    let hashedPassword = Users.hashPassword(req.body.password);
    Users.findOne({ username : req.body.username})
    .then(function(user) {
      if (user) {
      return res.status(400).send(req.body.username + ' already exists.');
      } else {

        Users
        .create({
          username: req.body.username,
          name: req.body.name,
          email: req.body.email,
          birth_date: req.body.birth_date,
          password: hashedPassword,
        })
        .then(function(user) {res.status(201).json(user) })
        .catch(function(error){
          console.error(error);
          res.status(500).send('Error Type 1: ' + error);
        });
      }
    }).catch(function(error) {
      console.error(error);
      res.status(500).send('Error Type 2: ' + error);
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
                });
        }
    }).catch(function (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
    });
});

app.patch('/users/:username', (req, res) => {
  Users.findOne({username : req.body.username })
  .then(function(user){
    if (user) {
      let hashedPassword = "";
      //I would like a validator here requesting the original password be entered corrently
      //But I am unsure how to do that at the present time.

      if (req.body.newPassword != ""){
        if (req.body.newPassword === req.body.newSPassword){
          hashedPassword = Users.hashPassword(req.body.newPassword);
        } else {
          return res.status(400).send('New passwords do not match.');
        }
      }

      let updateUserObject = {};

      if (req.body.name != "") updateUserObject.name = req.body.name;
      if (req.body.email != "") updateUserObject.email = req.body.email;
      if (req.body.birth_date != "") updateUserObject.birth_date = req.body.birth_date;
      if (hashedPassword != "") updateUserObject.password = hashedPassword;

      user.update(updateUserObject)
        .then(function (u) { res.status(201).json(u) })
        .catch(function (err) {
          res.status(500).send('Error: ' + err);
        });
    } else {
      return res.status(400).send(req.body.username + ' is not accessible.');
    }
  })
  .catch(function (error) {
    res.status(500).send('Error: ' + error);
  });
});

app.get('/favorites/:username', (req, res) => {
  Users.findOne({username : req.params.username })
  .then(function(user) {
    if (user){
      res.status(201).json(user.favorites);
    } else {
      return res.status(400).send(req.params.username + ' is not accessible.');
    }
  })
  .catch(function(err) {
    res.status(500).send('Error in /favorites/username GET type 2: ' + err);
  });
});

app.patch('/favorites/:username', (req, res) => {
//  res.send('We are working on favorites lists.  It will be available soon. RE: ' + req.params.username + ' and ' + req.params.titleId)
  Users.findOne({username : req.params.username })
  .then(function(user) {
    if (user){
      let updateUserFavorites = {};
      updateUserFavorites.favorites = req.body.favorites;

      user.update(updateUserFavorites)
      .then(function (u) {res.status(201).json(u) })
      .catch(function(err) {
        res.status(500).send('Error in /users/favorites/:username PATCH type 1: ' + err);
      });
    } else {
      return res.status(400).send(req.params.username + ' is not accessible.');
    }
  })
  .catch(function (error) {
    res.status(500).send('Error in /users/favorites/:username PATH type 2: ' + error);
  });
});

app.delete('/users/:username/:titleId', (req, res) => {
res.send('We are working on favorites lists.  It will be available soon. RE: ' + req.params.username + ' and ' + req.params.titleId)
/*  Users.findOne({ 'username': req.body.username })
  .then(function (user) {
    Users.updateOne({
      favorites: ["You Deleted Your Favorite Movies"]
    });
  }
  .catch(function (error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
*/
});

app.delete('/users/:username', (req, res) => {
//  res.send('We are working on deleting users.  In the meantime you are eternally ours. Mwahahahahahaha! RE: ' + req.params.username)
  Users.findOneAndDelete({username : req.body.username }, function(err, doc){
  })
  .then(function(user){
    res.json(user);
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send('Error: ' + error);
  });
});

/*  // For local development
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);*/

let port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port 3000");
});
