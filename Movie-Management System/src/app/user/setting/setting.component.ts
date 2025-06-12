import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UserService } from 'src/app/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {Router} from '@angular/router'

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  changepasswordForm:FormGroup
  userObj;
  changeError:boolean=false;
  changeMessage:string;
  changeOkay:boolean = false;
  changeOkayMsg:string;

  constructor(private fb:FormBuilder, private userservice:UserService,public modalService: BsModalService,private router:Router) { }

  ngOnInit(): void {
    this.userObj = this.userservice.dataOfLoggedUserBehaviourSubject.getValue()
    this.changepasswordForm=this.fb.group({
      old:['',[Validators.required]],
      new:['',[Validators.required,Validators.minLength(4),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirm:['',[Validators.required,Validators.minLength(4),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]]
    })
  }

  modalRef?: BsModalRef;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal(){
    this.modalRef?.hide()
  }

  gotoLogin(){
    localStorage.removeItem("token")
    this.userservice.dataOfLoggedUserBehaviourSubject.next(null)
    this.router.navigateByUrl("/login")
    this.modalRef?.hide()
  }

  onSubmit(template){
    let formObj = this.changepasswordForm.value
    let passwordObj = {
      _id:this.userObj._id,
      old:formObj.old,
      new:formObj.new,
      confirm:formObj.confirm
    }
    this.userservice.changePassword(passwordObj).subscribe({
      next:(res)=>{
        if(res.message != "Password updated successfully"){
          this.changeOkay = false
          this.changeOkayMsg=''
          this.changeError = true
          this.changeMessage = res.message
          this.openModal(template)
        }
        else if(res.message == "Password updated successfully"){
          this.changeError = false
          this.changeMessage = ""
          this.changeOkay = true
          this.changeOkayMsg=res.message
          this.openModal(template)
        }
      },
      error:(err)=>{console.log(err)}
    })
  }

  get old(){
    return this.changepasswordForm.get("old")
  }

  get new(){
    return this.changepasswordForm.get("new")
  }

  get confirm(){
    return this.changepasswordForm.get("confirm")
  }

}
