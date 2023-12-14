//  Add your code here
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    plot: { 
      type: String,
      required: true
    },
    cast: [{
        type: Schema.Types.ObjectId,
        ref: 'Celebrity' // This should match the name you gave your Celebrity model
      }]
  });


// Create the model from the schema

const Movie = mongoose.model('Movie', movieSchema);


// Export the Movie model
module.exports = Movie;