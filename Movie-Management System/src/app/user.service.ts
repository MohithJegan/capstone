import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public httpClientObj:HttpClient) { }

  //Application Section

  //create behaviour subject
  userLoginBehaviourSubject = new BehaviorSubject(null)

  //create user observable
  userLoginObservable = this.userLoginBehaviourSubject.asObservable()

  //logged user behaviour subject
  dataOfLoggedUserBehaviourSubject = new BehaviorSubject(null)

  //logged user observable
  dataOfLoggedUserObservable = this.dataOfLoggedUserBehaviourSubject.asObservable()

  //movie info behaviour subject
  movieInfoBehaviourSubject = new BehaviorSubject(null)

  //movie deletion behaviour subject
  deleteMovieBehaviourSubject = new BehaviorSubject('')

  //smart navbar toggle function
  navbarBehaviourSubject = new BehaviorSubject(false)

  //search for movies
  movieSearchBehaviourSubject = new BehaviorSubject(null)

  //create search observable
  movieSearchObservable = this.movieSearchBehaviourSubject.asObservable()


  //create user
  createUser(userObj):Observable<any>{
    return this.httpClientObj.post<any>(environment.createUser,userObj)
  }

  //login user
  loginUser(userCredentials):Observable<any>{
    this.userLoginBehaviourSubject.next(userCredentials.username)
    return this.httpClientObj.post<any>(environment.loginUser,userCredentials)
  }

  //login admin
  loginAdmin(adminCredentials):Observable<any>{
    this.userLoginBehaviourSubject.next(adminCredentials.username)
    return this.httpClientObj.post<any>(environment.loginAdmin,adminCredentials)
  }

  // edit user
  editUser(updateUser):Observable<any>{
    return this.httpClientObj.put<any>(environment.editUser,updateUser)
  }

  //logout user
  logoutUser(){
    localStorage.removeItem("token")
    this.userLoginBehaviourSubject.next(null)
    this.dataOfLoggedUserBehaviourSubject.next(null)
  }

  //change password
  changePassword(passwordObj):Observable<any>{
    return this.httpClientObj.put<any>(environment.changePassword,passwordObj)
  }

  //get movies
  getMovies():Observable<any>{
    return this.httpClientObj.get(environment.getMovies)
  }

  //get theatres
  getTheatres():Observable<any>{
    return this.httpClientObj.get(environment.getTheatres)
  }

  //add movies
  addMovies(movieObj):Observable<any>{
    return this.httpClientObj.post<any>(environment.addMovie,movieObj)
  }

  //get movie info using movie name
  getMovieByMovieName(movieName):Observable<any>{
    return this.httpClientObj.get<any>(environment.getMovieByMovieName+`/${movieName}`)
  }

  //get movie info using movie name
  getTheatreByTheatreId(theatreId):Observable<any>{
    return this.httpClientObj.get<any>(environment.getTheatreByTheatreId+`/${theatreId}`)
  }

  //get suggested movies using movie genre
  getSuggestedMoviesByGenreName(genreName):Observable<any>{
    return this.httpClientObj.get<any>(environment.getSuggestedMoviesByGenreName+`/${genreName}`)
  }

  //update movie in the database
  updateMovie(movieData: any) {
    return this.httpClientObj.put(environment.updateMovie, movieData);
  }

  //delete movie using movie name
  deleteMovies(movieName){
    return this.httpClientObj.put(environment.deleteMovie,movieName)
  }

  //restore movie
  getRestoreMovie():Observable<any>{
    return this.httpClientObj.get(environment.restoreMovie)
  }
  
  //restore movie by movie name
  getRestoredMovieByMovieName(movieName):Observable<any>{
    return this.httpClientObj.get(environment.getRestoreMovieByMovieName+`/${movieName}`)
  }
  
  //update status of movie and restore in view movies
  updateMovieStatus(movieObj):Observable<any>{
    return this.httpClientObj.put(environment.updateMovieStatus,movieObj)
  }

  //create seat
  createSeat(seatObj):Observable<any>{
    return this.httpClientObj.post(environment.createSeat,seatObj)
  }
  //update seat
  updateSeat(seatObj):Observable<any>{
    return this.httpClientObj.put(environment.updateSeat,seatObj)
  }
  //get seat using seat number
  getSeatUsingSeatNumber(seatNumber):Observable<any>{
    return this.httpClientObj.get(environment.getSeatUsingSeatNumber+`/${seatNumber}`)
  }

  //get all seats
  getAllSeatsInTheatre():Observable<any>{
    return this.httpClientObj.get(environment.getAllSeatsInTheatre)
  }

  // add booked seat to booking collection
  addBookedMovies(bookedmovieObj):Observable<any>{
    return this.httpClientObj.post<any>(environment.addBookedMovies,bookedmovieObj)
  }

  //get bookedmovie info using user name
  getBookedMovieByUserName(id):Observable<any>{
    return this.httpClientObj.get<any>(environment.getBookedMovieByUsername+`/${id}`)
  }

  //Testing Section

  // for testing
  getData(){
    return 100
  }

  getSum(a,b){
    return a+b
  }

  getPosts():Observable<any>{
    return this.httpClientObj.get(environment.getPosts)
  }

}