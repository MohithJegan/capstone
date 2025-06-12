//import express
const express = require("express");
const app = express();
const cors = require("cors");

const Movie = require("./models/Movie");
const Theatre = require("./models/Theatre");

//import dotenv
require("dotenv").config();

//import path
const path = require("path");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "dist/Frontend")));

//import mongoose
const mongoose = require("mongoose");
const dbConnectionUrl = process.env.DB_CONNECTION_URL;

//import apis
const userApi = require("./APIS/userApi");
const adminApi = require("./APIS/adminApi");

//connect mongoose
mongoose
  .connect(dbConnectionUrl)
  .then(() => {
    console.log("DB connection established...");
  })
  .catch((error) => {
    console.log("Error", error.message);
  });

//execute api based on match
app.use("/user", userApi);
app.use("/admin", adminApi);

//default path loading
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "dist/Frontend/index.html"));
});

//sync the movie from the API to DB
async function syncMoviesFromAPI() {
  try {
    const existingDoc = await Movie.findOne();

    if (
      existingDoc &&
      Array.isArray(existingDoc.movieList) &&
      existingDoc.movieList.length > 0
    ) {
      console.log("Movie list already exists. Skipping sync.");
      return;
    }

    const genresData = await getGenres();
    const genres = genresData.genres;

    const moviesByGenre = await Promise.all(
      genres.map(async (genre) => {
        const movieRes = await getMoviesThroughGenre(+genre.id);
        const theatreDoc = await Theatre.findOne();
        const theatreList = theatreDoc?.theatreList || [];
        const theatre =
          theatreList[Math.floor(Math.random() * theatreList.length)];
        return movieRes.results.map((movie) => ({
          movieName: movie.title,
          movieGenre: genre.name,
          movieRating: movie.vote_average?.toFixed(1),
          movieLanguage: movie.original_language,
          movieReleaseDate: movie.release_date,
          movieDescription: movie.overview || "No description available.",
          movieTheatre: [theatre],
          img:
            `https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
            "https://www.primevideo.com/detail/0S0OIMOTSETYIWA2EVTWWH7JR9/ref=atv_mv_hom_c_OB7591f8_brws_2_4?jic=8%7CEgRzdm9k",
          status: false,
        }));
      })
    );

    const allMovies = moviesByGenre.flat();

    if (!existingDoc) {
      //no document exists, create one
      await Movie.create({ movieList: allMovies });
      console.log("Movie list created.");
    } else {
      //document exists but movieList is empty
      existingDoc.movieList = allMovies;
      await existingDoc.save();
      console.log("Movie list updated.");
    }
  } catch (err) {
    console.error("Error syncing movies from API:", err);
  }
}

//sync the theatre from the API to DB
async function syncTheatreFromAPI() {
  try {
    //check if data already exists in DB
    const existingDoc = await Theatre.findOne();

    if (
      existingDoc &&
      Array.isArray(existingDoc.theatreList) &&
      existingDoc.theatreList.length > 0
    ) {
      console.log("Theatre data already exists. Skipping sync.");
      return;
    }

    const data = await getTheatres();

    //process the API data
    const theatres = data.data.map((theatre) => ({
      id: theatre.id,
      name: theatre.name,
      address: theatre.address,
      city: theatre.city,
      state: theatre.state,
      post_code: theatre.post_code,
      country_id: theatre.country_id,
      chain_id: theatre.chain_id,
      external_id: theatre.external_id,
      email: theatre.email || null,
      phone: theatre.phone || null,
      latitude: theatre.latitude,
      longitude: theatre.longitude,
      timezone: theatre.timezone || "America/Toronto",
    }));

    //save the theatre data in the DB
    if (!existingDoc) {
      //no document exists, create one
      await Theatre.create({ theatreList: theatres });
      console.log("Theatre data created.");
    } else {
      //document exists but theatreList is empty
      existingDoc.theatreList = theatres;
      await existingDoc.save();
      console.log("Theatre data updated.");
    }
  } catch (err) {
    console.error("Error syncing theatre data from API:", err);
  }
}

//get genres from the API
async function getGenres() {
  // request the API
  const requestUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API}`;
  const response = await fetch(requestUrl);
  // return the JSON response
  return await response.json();
}

// Get all the movies for the genre id
async function getMoviesThroughGenre(genreId) {
  // request the API
  const requestUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API}&with_genres=${genreId}&language=en-US`;
  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  // return the JSON response
  return await response.json();
}

async function getTheatres() {
  const requestUrl = "https://showtime-api.p.rapidapi.com/api/v1/theaters";

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${process.env.RAPID_API_KEY}`,
      "X-RapidAPI-Host": `${process.env.RAPID_API_HOST}`,
    },
  });
  // return the JSON response
  return await response.json();
}


//assign port
const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`Server is actively watching on ${PORT}...`);
  await syncMoviesFromAPI();
  await syncTheatreFromAPI();
});
