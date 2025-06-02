import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemovieComponent } from './deletemovie.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { BsModalRef, BsModalService,ModalModule } from 'ngx-bootstrap/modal';

describe('DeletemovieComponent', () => {
  let component: DeletemovieComponent;
  let fixture: ComponentFixture<DeletemovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule.forRoot()
      ],
      declarations: [ DeletemovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletemovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
