import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from '../user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  modalRef?: BsModalRef;
  userTypeForm:FormGroup;
  error:boolean=false;
  errorMessage:string;
  
  constructor(public routerObj:Router,public formBuilderObj:FormBuilder,public userServiceObj:UserService,public modalService: BsModalService) { }

  ngOnInit(): void {
    this.userTypeForm = this.formBuilderObj.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  

  //getters


  get username(){
    return this.userTypeForm.get("username")
  }

  get password(){
    return this.userTypeForm.get("password")
  }

  goToSignUp(){
    this.routerObj.navigateByUrl("/signup")
  }

onSubmit(template: TemplateRef<any>) {
  const loginCredentials = this.userTypeForm.value;

  // logging in as user first
  this.userServiceObj.loginUser(loginCredentials).subscribe({
    next: (response) => {
      if (response.message === "Login Successful") {
        this.error = false;
        this.errorMessage = '';
        localStorage.setItem("token", response.token);
        this.userServiceObj.dataOfLoggedUserBehaviourSubject.next(response.user);
        this.routerObj.navigateByUrl("/user");
      } else {
        // admin login if user login failed
        this.tryAdminLogin(loginCredentials, template);
      }
    },
    error: () => {
      // Try admin login if user login threw error (e.g., 401 or 404)
      this.tryAdminLogin(loginCredentials, template);
    }
  });
}

tryAdminLogin(credentials: any, template: TemplateRef<any>) {
  this.userServiceObj.loginAdmin(credentials).subscribe({
    next: (response) => {
      if (response.message === "Login Successful") {
        this.error = false;
        this.errorMessage = '';
        localStorage.setItem("token", response.token);
        this.userServiceObj.dataOfLoggedUserBehaviourSubject.next(response.admin);
        this.routerObj.navigateByUrl("/admin");
      } else {
        this.error = true;
        this.errorMessage = response.message;
        this.openModal(template);
      }
    },
    error: () => {
      this.error = true;
      this.errorMessage = "Invalid Username or Password";
      this.openModal(template);
    }
  });
}


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(){
    this.modalRef?.hide()
  }

}
