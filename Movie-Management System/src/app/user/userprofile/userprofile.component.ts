import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userObj: any;
  formVal: FormGroup;
  id: any;
  status: boolean;
  version: any;
  password: any;
  modalRef?: BsModalRef;

  constructor(
    public userservice: UserService,
    private formbuildObj: FormBuilder,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.userObj = this.userservice.dataOfLoggedUserBehaviourSubject.getValue();
    this.id = this.userObj._id;
    this.status = this.userObj.status;
    this.version = this.userObj._v;
    this.password = this.userObj.password;


    this.formVal = this.formbuildObj.group({
      username: [this.userObj.username],
      password: [''],
      email: [this.userObj.email],
      city: [this.userObj.city],
      age: [this.userObj.age]
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm(): void {
    const obj = this.formVal.value;

    const user = {
      username: obj.username,
      email: obj.email,
      city: obj.city,
      age: obj.age,
      _id: this.id
    };
    this.userservice.editUser(user).subscribe({
    next: (res) => {
      // Update the local userObj
      this.userObj = { ...this.userObj, ...user };

      const updatedUser = {
        ...this.userObj,
        password: this.password,
        _v: this.version
      };

      this.userservice.dataOfLoggedUserBehaviourSubject.next(updatedUser);
      this.modalRef?.hide();
    },
    error: (err) => console.log(err)
  });
   
  }
}
