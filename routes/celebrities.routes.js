const express = require('express');
const Celebrity = require('../models/Celebrity.model')

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require('../models/Celebrity.model');

// Route to show the form for creating a new celebrity
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
  });

// Route to show all celebrities

router.get('/celebrities', (req, res, next) => {
  // List all celebrities
  Celebrity.find()
    .then(foundCelebrities => {
      console.log('foundCelebrities', foundCelebrities);
      res.render('celebrities/celebrities', { foundCelebrities });
    })
    .catch(err => console.error(err));
});




// Route to process the form and create a new celebrity
router.post('/celebrities/create', (req, res, next) => {
  console.log('Creating a celebrity with:', req.body);
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create(req.body)
    .then(() => res.redirect('/celebrities'))
    .catch(err => {
      console.error('Error creating a new celebrity:', err); 
      res.render('celebrities/new-celebrity', { errorMessage: 'Error creating a new celebrity' });
    });
});
  

module.exports = router;