import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreComponent } from './genre.component';

import { BsModalRef, BsModalService,ModalModule } from 'ngx-bootstrap/modal';

describe('GenreComponent', () => {
  let component: GenreComponent;
  let fixture: ComponentFixture<GenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ModalModule.forRoot()],
      declarations: [ GenreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
