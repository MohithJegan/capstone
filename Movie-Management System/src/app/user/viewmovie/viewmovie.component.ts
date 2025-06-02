import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-viewmovie',
  templateUrl: './viewmovie.component.html',
  styleUrls: ['./viewmovie.component.css'],
})
export class ViewmovieComponent implements OnInit {
  movieList: any[] = [];
  loggedUser: string;
  searchTerm: string = '';
  role: string;

  currentPage: number = 1;
  itemsPerPage: number = 20;

  sortDirection: 'asc' | 'desc' = 'asc';

  languages: { code: string; name: string }[] = [
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

  constructor(public userServiceObj: UserService, public routerObj: Router) {}

  ngOnInit(): void {
    this.loggedUser = this.userServiceObj.userLoginBehaviourSubject.getValue();
    this.role =
      this.userServiceObj.dataOfLoggedUserBehaviourSubject.getValue().role;

    this.userServiceObj.getMovies().subscribe({
      next: (response) => {
        if (response.message === 'Movie List') {
          this.movieList = response.payload;
        }
      },
      error: (error) => {
        console.log('Error', error.message);
      },
    });

    this.userServiceObj.movieSearchObservable.subscribe({
      next: (res) => {
        this.searchTerm = res;
        this.currentPage = 1; // reset to first page on search
      },
    });
  }

  get filteredMovies(): any[] {
    if (!this.searchTerm) return this.movieList;
    return this.movieList.filter((movie) =>
      movie.movieName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedMovies(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredMovies.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredMovies.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  sortMovies() {
    if (this.sortDirection === 'asc') {
      this.movieList.sort((a, b) => a.movieName.localeCompare(b.movieName));
      this.sortDirection = 'desc';
    } else {
      this.movieList.sort((a, b) => b.movieName.localeCompare(a.movieName));
      this.sortDirection = 'asc';
    }
  }

  getLanguageNameByCode(code: string): string {
    const found = this.languages.find((lang) => lang.code === code);
    return found ? found.name : code;
  }

  goToMovieDetails(movieName: string) {
    this.userServiceObj.getMovieByMovieName(movieName).subscribe({
      next: (response) => {
        if (response.message === 'Movie Found') {
          this.userServiceObj.movieInfoBehaviourSubject.next(response.payload);
          this.routerObj.navigateByUrl('/user/movieinfo');
        }
      },
    });
  }

  goToEditPage(movie) {
    this.userServiceObj.movieInfoBehaviourSubject.next(movie);
    this.routerObj.navigateByUrl('/admin/editmovie');
  }

  goToDeletePage(movieName) {
    this.userServiceObj.deleteMovieBehaviourSubject.next(movieName);
    this.routerObj.navigateByUrl('/admin/deletemovie');
  }
}
