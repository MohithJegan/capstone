import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usersignupForm:FormGroup;
  error:boolean=false;

  constructor(public formBuilderObj:FormBuilder,public userServiceObj:UserService,public routerObj:Router,public modalService: BsModalService) { }

  ngOnInit(): void {
    this.usersignupForm=this.formBuilderObj.group({
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(5),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      email:['',[Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      city:['',[Validators.required]],
      age:['',[Validators.required]]
    })
  }

  //getters

  get username(){
    return this.usersignupForm.get("username")
  }

  get password(){
    return this.usersignupForm.get("password")
  }

  get email(){
    return this.usersignupForm.get("email")
  }

  get city(){
    return this.usersignupForm.get("city")
  }

  get age(){
    return this.usersignupForm.get("age")
  }

  onSubmit(template:TemplateRef<any>){
    //subscribe observable
    this.userServiceObj.createUser(this.usersignupForm.value).subscribe({
      next:(response)=>{
        if(response.message=="User Created"){
          this.openModal(template)
        }
        else{
          if(response.message=="Username already taken.Please choose some other..."){
            this.error = true
            this.openModal(template)
          }
        }
      },
      error:(error)=>{
        alert("Something went wrong...")
      }
    })
    
  }

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(){
    //navigate to login page
    this.routerObj.navigateByUrl("/login")
    this.modalRef?.hide()
  }

}
