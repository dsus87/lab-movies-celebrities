// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require('../models/Celebrity.model');

// Route to show the form for creating a new celebrity
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
  });

// Route to process the form and create a new celebrity
router.post('/celebrities/create', async (req, res) => {
    try {
      const { name, occupation, catchPhrase } = req.body;
      await Celebrity.create({ name, occupation, catchPhrase });
      res.redirect('/celebrities'); // Redirect to the list of celebrities, to be implemented in the next iteration
    } catch (error) {
      res.render('celebrities/new-celebrity', { errorMessage: 'Error creating a new celebrity' });
    }
  });

module.exports = router;