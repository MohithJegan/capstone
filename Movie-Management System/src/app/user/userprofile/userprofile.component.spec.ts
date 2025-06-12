import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserprofileComponent } from './userprofile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule,FormsModule} from '@angular/forms';
import { BsModalRef, BsModalService,ModalModule } from 'ngx-bootstrap/modal';

describe('UserprofileComponent', () => {
  let component: UserprofileComponent;
  let fixture: ComponentFixture<UserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[       
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ModalModule.forRoot()
      ],
      declarations: [ UserprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
