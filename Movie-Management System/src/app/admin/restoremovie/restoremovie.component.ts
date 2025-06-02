import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restoremovie',
  templateUrl: './restoremovie.component.html',
  styleUrls: ['./restoremovie.component.css']
})
export class RestoremovieComponent implements OnInit {
  toBeRestored:any

  constructor(public userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getRestoredMovieData()
  }

  restoreMovie(movieName){
    this.userService.getRestoredMovieByMovieName(movieName).subscribe({
      next:(response)=>{
        this.userService.updateMovieStatus(response.payload).subscribe({
          next:(response)=>{
            this.getRestoredMovieData()
            this.router.navigateByUrl("/admin/viewmovie")
          }
        })
      }
})
}
getRestoredMovieData(){
    this.userService.getRestoreMovie().subscribe({
      next:(response)=>{
        this.toBeRestored=response.payload
      }
    })
}
}