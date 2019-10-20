const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  title : {type: String, required: true},
  description: {type: String, required: true},
  genre : {type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  director : {type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
  actors : [String],
  image_path : String,
  featured : Boolean
});

let userSchema = mongoose.Schema({
  username : {type: String, required: true},
  name : {type: String, required: true},
  password : {type: String, required: true},
  email : {type: String, required: true},
  birth_date : Date,
  favorites : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

let genreSchema = mongoose.Schema({
  name : {type: String, required: true},
  description : {type: String, required: true}
});

let directorSchema = mongoose.Schema({
  name : {type: String, required: true},
  bio : String,
  birthyear : Date
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Director = mongoose.model('Director', directorSchema);
let Genre = mongoose.model('Genre', genreSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
