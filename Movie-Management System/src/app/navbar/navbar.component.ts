import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchTerm:string
  admin:string

  constructor(public userServiceObj:UserService) { }

  ngOnInit(): void {
    console.log(environment)
    //this.admin=environment.Admin
  }

  searchFor(){
    this.userServiceObj.movieSearchBehaviourSubject.next(this.searchTerm)
  }

  callFromHome(){
    this.userServiceObj.navbarBehaviourSubject.next(false)
  }

  callFromOther(){
    this.userServiceObj.navbarBehaviourSubject.next(true)
  }

}
