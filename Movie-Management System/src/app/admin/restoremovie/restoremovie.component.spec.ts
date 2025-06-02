import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  RouterTestingModule} from '@angular/router/testing'
import { RestoremovieComponent } from './restoremovie.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RestoremovieComponent', () => {
  let component: RestoremovieComponent;
  let fixture: ComponentFixture<RestoremovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ RestoremovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoremovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
