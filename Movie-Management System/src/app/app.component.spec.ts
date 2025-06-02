import { TestBed,ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let debugElement:DebugElement;
  let fixture: ComponentFixture<AppComponent>
  let app:AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges()
    debugElement=fixture.debugElement
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Frontend'`, () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;
    expect(app.title).toEqual('Frontend');
  });

  //create navbar component
it('Created Navbar Component',()=>{
  let child= debugElement.query(By.css('app-navbar'))
  expect(child).toBeTruthy()
  })
  
  it('Created Footer Component',()=>{
  let child= debugElement.query(By.css('app-footer'))
  expect(child).toBeTruthy();
  })

  it('Created Router Outlets',()=>{
  let child= debugElement.query(By.css('router-outlet'))
  expect(child).toBeTruthy();
  })
});
