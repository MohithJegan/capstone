//import mongoose
const mongoose = require("mongoose")

//create a schema
// const movieSchema = new mongoose.Schema({
//     //username:{type:String},
//     movieList:{type:Array}
// })

const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  movieGenre: { type: String, required: true },
  movieRating: { type: String, required: true }, // Or Number, if you want to treat ratings numerically
  movieLanguage: { type: String, required: true },
  movieReleaseDate: { type: String, required: true },
  movieDescription: { type: String, required: true },
  movieTheatre: {type: Array},
  img: { type: String, required: true },
  status: { type: Boolean, default: false }
});

const movieListSchema = new mongoose.Schema({
  movieList: {
    type: [movieSchema],
    required: true
  }
});

//create a model
const movieModel = mongoose.model('moviecollection',movieListSchema)

//export
module.exports = movieModel


// const mongoose = require('mongoose');



// const MovieList = mongoose.model('MovieList', movieListSchema);

// module.exports = MovieList;