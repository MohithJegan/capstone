import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import * as AOS from 'aos'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  // inHomePage:boolean=false

  constructor(public userServiceObj:UserService){
  }

  ngOnInit(): void {

  }
}
