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


  // GET Route for all movies 

  router.get('/movies', (req, res, next) => {
    Movie.find()
      .then(allMovies => {
        res.render('movies/movies', { movies: allMovies });
      })
      .catch(err => console.error(err));
  });
  

// Display movie details

router.get('/movies/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .populate('cast')
    .then(movie => {
      res.render('movies/movie-details', { movie });
    })
    .catch(err => console.error(err));
});

module.exports = router;


// Delete movie

router.post('/movies/:id/delete', (req, res, next) => {
  // Delete the movie
  Movie.findByIdAndDelete(req.params.id)
      .then(() => res.redirect('/movies')) 
      .catch(err => console.error(err));
});

//Edit Movies GET

router.get('/movies/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then(foundMovie => {
      console.log('foundMovie', foundMovie);
      res.render('movies/edit-movie', { movie: foundMovie });
    })
    .catch(err => console.error(err));
});

// Edit Movies POST

router.post('/movies/:id/edit', (req, res, next) => {
  console.log('req.body', req.body);
  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => res.redirect(`/movies/${req.params.id}`))
    .catch(err => console.error(err));
});