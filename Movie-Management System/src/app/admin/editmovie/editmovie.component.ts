import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent implements OnInit {
  movie: any = {}; 
  modalRef?: BsModalRef;
  movieUpdated: boolean = false;
  updateFailed: boolean = false;
  theatreList: any[] = [];
 
  languageList: { code: string; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'Tamil' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'ko', name: 'Korean' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'bn', name: 'Bengali' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'ur', name: 'Urdu' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'mr', name: 'Marathi' },
  ];

  constructor(
    public userServiceObj: UserService, 
    public routerObj: Router,
    public modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.movie = this.userServiceObj.movieInfoBehaviourSubject.getValue();
    console.log("msmsms", this.movie)
     // Normalize movieLanguage on load
    if (this.movie?.movieLanguage) {
      this.movie.movieLanguage = this.normalizeLanguage(this.movie.movieLanguage);
    }
    this.userServiceObj.getTheatres().subscribe({
    next: (response) => {
      if (response.message == "Theatre List") {
        this.theatreList = response.payload;
      }
    },
    error: (error) => {
      console.log("Error", error.message);
    }
  });
  }

  editMovie(template: TemplateRef<any>) {
    // this.userServiceObj.getTheatreByTheatreId(this.movie.theatre)
    console.log("ipdatted",this.movie)
    this.userServiceObj.updateMovie(this.movie).subscribe({
      next: (response) => {
        this.updateFailed = false;
        this.movieUpdated = true;
        this.openModal(template);
      },
      error: () => {
        this.movieUpdated = false;
        this.updateFailed = true;
        this.openModal(template);
      }
    });
  }

 normalizeLanguage(language: string): string {
  // First, check if the language is already a code
  if (this.languageList.some(lang => lang.code === language)) {
    return language;
  }
  // If not, try to match the name and return the code
  const found = this.languageList.find(lang => lang.name.toLowerCase() === language.toLowerCase());
  return found ? found.code : '';
}



  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  confirm() {
    this.modalRef?.hide();
    if (this.movieUpdated) {
      this.routerObj.navigateByUrl('/admin/viewmovie');
    }
  }
}