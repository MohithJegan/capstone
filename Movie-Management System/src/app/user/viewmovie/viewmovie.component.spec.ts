import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmovieComponent } from './viewmovie.component';

import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { SearchPipe } from '../search.pipe';

describe('ViewmovieComponent', () => {
  let component: ViewmovieComponent;
  let fixture: ComponentFixture<ViewmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ ViewmovieComponent,SearchPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
