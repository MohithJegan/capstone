import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css'],
})
export class AddmovieComponent implements OnInit {
  theatreList: any[] = [];
  addmovieForm: FormGroup;
  movieadded: boolean = false;
  movieRegistered: boolean = false;
  languages: string[] = [
    'English',
    'Tamil',
    'Hindi',
    'Telugu',
    'French',
    'Spanish',
    'German',
    'Japanese',
    'Chinese',
    'Russian',
    'Italian',
    'Portuguese',
    'Arabic',
    'Bengali',
    'Malayalam',
    'Urdu',
    'Punjabi',
    'Gujarati',
    'Marathi',
  ];
  imageUrl: string = 'https://bulma.io/images/placeholders/480x480.png';
  modalRef?: BsModalRef;
  isSubmitting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private routerObj: Router,
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTheatres();
  }

  initializeForm(): void {
    this.addmovieForm = this.formBuilder.group({
      movieName: ['', [Validators.required]],
      movieGenre: ['', [Validators.required]],
      movieRating: ['', [Validators.required]],
      movieReleaseDate: ['', [Validators.required]],
      img: ['', [Validators.required]],
      movieLanguage: ['', [Validators.required]],
      movieDescription: ['', [Validators.required]],
      movieTheatre: ['', [Validators.required]],
    });
  }

  loadTheatres(): void {
    this.userService.getTheatres().subscribe({
      next: (response) => {
        if (response.message == 'Theatre List') {
          this.theatreList = response.payload;
        }
      },
      error: (error) => {
        console.error('Error loading theatres:', error);
      },
    });
  }

  onSubmit(template: TemplateRef<any>): void {
    this.isSubmitting = true;

    // Mark all fields as touched to show validation messages
    this.addmovieForm.markAllAsTouched();

    if (this.addmovieForm.invalid) {
      this.isSubmitting = false;
      return;
    }

    const formValue = this.addmovieForm.value;
    formValue.status = false;
    formValue.img = formValue.img || this.imageUrl;

    this.userService.getTheatreByTheatreId(formValue.movieTheatre).subscribe({
      next: (response) => {
        if (response.message == 'Theatre Found') {
          const movieObj = {
            ...formValue,
            movieTheatre: response.payload,
          };

          this.userService.addMovies(movieObj).subscribe({
            next: (response) => {
              this.isSubmitting = false;
              if (response.message == 'Movie Added') {
                this.movieRegistered = false;
                this.movieadded = true;
                this.openModal(template);
                // Reset validation state without clearing values
                this.addmovieForm.markAsPristine();
                this.addmovieForm.markAsUntouched();
              } else if (response.message == 'Movie already registered') {
                this.movieadded = false;
                this.movieRegistered = true;
                this.openModal(template);
              }
            },
            error: (error) => {
              this.isSubmitting = false;
              console.error('Error adding movie:', error);
            },
          });
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error getting theatre:', error);
      },
    });
  }

  confirm(): void {
    this.modalRef?.hide();
    if (this.movieadded) {
      // Only reset form after successful submission
      this.routerObj.navigateByUrl('/admin/viewmovie');
      this.modalRef?.hide();
      this.imageUrl = 'https://bulma.io/images/placeholders/480x480.png';
    }
    this.movieadded = false;
    this.movieRegistered = false;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  // Getters for form controls
  get movieName() {
    return this.addmovieForm.get('movieName');
  }
  get movieGenre() {
    return this.addmovieForm.get('movieGenre');
  }
  get movieRating() {
    return this.addmovieForm.get('movieRating');
  }
  get movieReleaseDate() {
    return this.addmovieForm.get('movieReleaseDate');
  }
  get img() {
    return this.addmovieForm.get('img');
  }
  get movieLanguage() {
    return this.addmovieForm.get('movieLanguage');
  }
  get movieDescription() {
    return this.addmovieForm.get('movieDescription');
  }
  get movieTheatre() {
    return this.addmovieForm.get('movieTheatre');
  }
}
