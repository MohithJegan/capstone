//import mongoose
const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  movieGenre: { type: String, required: true },
  movieRating: { type: String, required: true }, 
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
