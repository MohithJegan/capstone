import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NopageComponent } from './nopage.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('NopageComponent', () => {
  let component: NopageComponent;
  let fixture: ComponentFixture<NopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      declarations: [ NopageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
