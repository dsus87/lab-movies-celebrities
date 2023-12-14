// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all your routes here

module.exports = router;


// GET Route to show a form to create a movie

router.get('/movies/new', (req, res) => {
  Celebrity.find()
    .then(allCelebrities => {
      res.render('movies/new-movie', { celebrities: allCelebrities });
    })
    .catch(err => console.error(err));
});


//POST to send the data from the form to this route to create the movie and save it to the database

router.post('/movies/create', (req, res) => {
    console.log('Creating a movie with:', req.body);
    const { title, genre, plot, cast } = req.body;
  
    Movie.create(req.body)
      .then(() => res.redirect('/movies')) // Redirect to the list of all movies
      .catch(err => {
        console.error('Error creating a new movie:', err);
        res.render('movies/new-movie', { errorMessage: 'Error creating a new movie' });
      });
  });