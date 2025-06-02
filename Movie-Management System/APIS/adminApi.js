//import mini express
const express = require("express")
const adminApp = express.Router()

//body parser middleware
adminApp.use(express.json())

//import admin model
const Admin = require("../models/Admin")

//import movie model
const Movie = require("../models/Movie")

//import theatre model
const Theatre = require("../models/Theatre")

//import express-async-handler
const expressAsyncHandler = require("express-async-handler")

//import dotenv
require("dotenv").config()

//import bcryptjs
const bcryptjs = require("bcryptjs")

//import jsonwebtoken
const jsonwebtoken = require("jsonwebtoken")

//Movie section

//get movies from DB 
adminApp.get("/getmovies",expressAsyncHandler(async(request,response)=>{
    //get movies by admin
    const adminInfo = await Movie.findOne()
    //get movie list
    const movieList = adminInfo.movieList
    //get movie with status as false
    const movieAvailable = movieList.filter(movieObj=>movieObj.status==false)
    //send info
    response.send({message:"Movie List",payload:movieAvailable})
}))

//get theatres from DB 
adminApp.get("/gettheatres",expressAsyncHandler(async(request,response)=>{
    //get theatres from DB
    const theatreInfo = await Theatre.findOne()
    //get movie list
    const theatreList = theatreInfo.theatreList
    //send info
    response.send({message:"Theatre List",payload:theatreList})
}))

//get movie using moviename
adminApp.get("/getmovie/:movieName",expressAsyncHandler(async(request,response)=>{
    //get movie name from user
    let movieName = request.params.movieName
    //search for admin in DB
    let adminInfo = await Movie.findOne();
    //get all movies
    let movies = adminInfo.movieList
    //get movie of user choice
    let movie = movies.find(movieObj=>movieObj.movieName==movieName)
    //send info
    response.send({message:"Movie Found",payload:movie})

}))

//get theatre using theatre name
adminApp.get("/gettheatre/:theatreId",expressAsyncHandler(async(request,response)=>{
    //get theatre Id from user
    let theatreId = request.params.theatreId
    let theatreInfo = await Theatre.findOne();
    //get all movies
    let theatres = theatreInfo.theatreList
    //get theatre info from DB
    let theatre = theatres.find(theatreObj=>theatreObj.id==theatreId)
    //send info
    response.send({message:"Theatre Found",payload:theatre})

}))

//get movies using genreName
adminApp.get("/getsuggestedmovie/:genreName",expressAsyncHandler(async(request,response)=>{
    //get movie name from user
    let genreName = request.params.genreName
    //search for admin in DB
    let adminInfo = await Movie.findOne()
    //get all movies
    let movies = adminInfo.movieList
    //get movies of user choice
    let suggestedMovie = [];
    suggestedMovie.push(movies.filter(movieObj=>movieObj.movieGenre==genreName))
    //send info
    response.send({message:"Suggested Movies",payload:suggestedMovie})

}))

adminApp.post("/addmovie", expressAsyncHandler(async (request, response) => {
    try {
        const newMovie = request.body;

        const adminInfo = await Movie.findOne();

        if (adminInfo == null) {
            // If no admin doc exists, create one with movieList as array
            let movieDoc = new Movie({ movieList: [newMovie] });
            await movieDoc.save();
            response.send({ message: "Admin Created with Movie" });
        } else {
            let movies = adminInfo.movieList ?? [];

            let existingMovie = movies.find(movieObj => movieObj.movieName === newMovie.movieName);

            if (!existingMovie) {
                adminInfo.movieList.unshift(newMovie);
                await adminInfo.save();
                response.send({ message: "Movie Added", payload: newMovie });
            } else {
                response.send({ message: "Movie already registered" });
            }
        }
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: "Internal Server Error", error: err.message });
    }
}));


//remove movies
adminApp.put("/removemovie",expressAsyncHandler(async(request,response)=>{
    //get movie name
    let movieNameToRemove = request.body.movieName
    //check for existence
    let movieDetailsInDb = await Movie.findOne()
    //if not null
    if(movieDetailsInDb!==null){
        //get movies available
        let moviesAvailable = movieDetailsInDb.movieList
        //find movie of admin selected
        let adminSelectedMovie = moviesAvailable.find(movieObj=>movieObj.movieName==movieNameToRemove)
        //update the status
        adminSelectedMovie.status=true
        //update
        await Movie.findOneAndUpdate({movieName:movieNameToRemove},{$set:{movieList:moviesAvailable}})
        response.send({message:"Movie Deleted"})
    }
}))

//get restore movie
adminApp.get("/restoremovie",expressAsyncHandler(async(request,response)=>{
    //get movies by admin
    const adminInfo = await Movie.findOne()
    //get movie list
    const movieList = adminInfo.movieList
    //get movie with status as true
    const movieAvailable = movieList.filter(movieObj=>movieObj.status==true)
    //send info
    response.send({message:"Movie List",payload:movieAvailable})
}))

//get restore movie using movie name
adminApp.get("/restoremoviebyname/:movieName",expressAsyncHandler(async(request,response)=>{
    //get movie name from user
    let movieName = request.params.movieName
    //search for admin in DB
    // let adminInfo = await Movie.findOne({username:process.env.ADMIN})
    let adminInfo = await Movie.findOne()
    //get all movies
    let movies = adminInfo.movieList
    //get movie of user choice
    let movie = movies.find(movieObj=>movieObj.movieName==movieName)
    //send info
    response.send({message:"Movie Found",payload:movie})
}))

//update status of movie 
adminApp.put('/updatestatus',expressAsyncHandler(async(request,response)=>{
    //get movie name
    let movieNameToRemove = request.body.movieName
    //check for existence
    let movieDetailsInDb = await Movie.findOne()
    //if not null
    if(movieDetailsInDb!==null){
        //get movies available
        let moviesAvailable = movieDetailsInDb.movieList
        //find movie of admin selected
        let adminSelectedMovie = moviesAvailable.find(movieObj=>movieObj.movieName==movieNameToRemove)
        //update the status
        adminSelectedMovie.status=false
        //update
        await Movie.findOneAndUpdate({movieName:movieNameToRemove},{$set:{movieList:moviesAvailable}})
        response.send({message:"Movie Deleted"})
    }
}))


adminApp.put("/editmovie", expressAsyncHandler(async (request, response) => {
    try {
      const movieNameToEdit = request.body.movieName;
  
      //fetch the movie document 
      const movieDetailsInDb = await Movie.findOne();
  
      if (movieDetailsInDb !== null) {
        let moviesAvailable = movieDetailsInDb.movieList;
  
        //find the movie by name
        let adminSelectedMovie = moviesAvailable.find(
          (movieObj) => movieObj.movieName === movieNameToEdit
        );
  
        if (adminSelectedMovie) {
          //update only provided fields
          adminSelectedMovie.movieRating = request.body.movieRating ?? adminSelectedMovie.movieRating;
          adminSelectedMovie.movieGenre = request.body.movieGenre ?? adminSelectedMovie.movieGenre;
          adminSelectedMovie.movieDuration = request.body.movieDuration ?? adminSelectedMovie.movieDuration;
          adminSelectedMovie.movieYear = request.body.movieYear ?? adminSelectedMovie.movieYear;
          adminSelectedMovie.movieLanguage = request.body.movieLanguage ?? adminSelectedMovie.movieLanguage;
          adminSelectedMovie.movieDescription = request.body.movieDescription ?? adminSelectedMovie.movieDescription;
          adminSelectedMovie.img = request.body.img ?? adminSelectedMovie.img;
          adminSelectedMovie.movieTheatre = request.body.movieTheatre ?? adminSelectedMovie.movieTheatre;

          movieDetailsInDb.markModified("movieList");
  
          //save changes to DB
          await movieDetailsInDb.save();
  
          response.status(200).send({ message: "Movie Updated", payload: adminSelectedMovie });
        } else {
          response.status(404).send({ message: "Movie not found" });
        }
      } else {
        response.status(404).send({ message: "Movie list not found in DB" });
      }
    } catch (err) {
      console.error(err);
      response.status(500).send({ message: "Internal Server Error", error: err.message });
    }
  }));
  

//Admin section

//create admin
adminApp.post("/createadmin",expressAsyncHandler(async(request,response)=>{
    //get admin data
    const adminData = request.body
    //get password and hash
    let hashedPassword = await bcryptjs.hash(adminData.password,5)
    adminData.password = hashedPassword
    //create admin doc
    const adminDoc = new Admin({...adminData})
    //save
    adminDoc.save()
    //send info
    response.send({message:"Admin Created",payload:adminDoc})

}))

//login admin
adminApp.post("/login",expressAsyncHandler(async(request,response)=>{
    //get login credentials from user
    let adminCredentials = request.body
    //check for username in DB
    let adminDataInDb = await Admin.findOne({username:adminCredentials.username})
    //if it is null
    if(adminDataInDb==null){
        response.send({message:"Invalid Username"})
    }
    else{
        //verify password 
        let result = await bcryptjs.compare(adminCredentials.password,adminDataInDb.password)
        if(result==false){
            response.send({message:"Invalid Password"})
        }
        else{
            //create a signed token
            let signedToken = jsonwebtoken.sign({username:adminDataInDb.username},process.env.SECRET_KEY,{expiresIn:100})
            //send info
            response.send({message:"Login Successful",token:signedToken,admin:adminDataInDb})

        }
    }
}))





//path not match error
adminApp.use((request,response,next)=>{
    response.send({message:"Path not available"})
})

//error handling middleware
adminApp.use((error,request,response,next)=>{
    response.send({message:"Error",payload:error.message})
})

//export
module.exports = adminApp