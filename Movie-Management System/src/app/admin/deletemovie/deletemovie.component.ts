import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent implements OnInit {

  ask:boolean = true;
  hide:boolean = true;
  successsignup:boolean = false;

  constructor(public userServiceObj:UserService,public routerObj:Router,public modalService: BsModalService) { }

  ngOnInit(): void {
    
  }

  confirmdelete(template:TemplateRef<any>){
    this.openModal(template)
  }

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(){
    this.ask = false
    this.successsignup = true
    this.hide = false
  }

  deleteconfirm(movieName){
    let movieObj ={
      movieName:movieName
    }
    this.userServiceObj.deleteMovies(movieObj).subscribe({
      next:(response)=>{
        // navigate to view page
        this.routerObj.navigateByUrl("/admin/viewmovie")
      },
      error:()=>{
        console.log("Something went wrong...Please try again later")
      }
    })
    this.modalRef?.hide()
  }


  decline(){
    this.modalRef?.hide()
  }

}
