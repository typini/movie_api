const express = require('express'),
  morgan = require('morgan');

const app = express();

const staticTopTen = [
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

app.use(morgan('common'));

app.get('/movies', function(req, res){
  res.json(staticTopTen)
});

app.get('/', function(req, res){
  res.send('Welcome to Reel Creations API')
});

app.use(express.static('public'));

app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
