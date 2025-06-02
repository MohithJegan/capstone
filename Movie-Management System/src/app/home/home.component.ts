import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  moviesByGenre: { [genre: string]: any[] } = {};
  availableGenres: string[] = [];
  chunkedMoviesByGenre: { [genre: string]: any[][] } = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getMovies().subscribe({
      next: (response) => {
        if (response.message === "Movie List") {
          this.organizeMoviesByGenre(response.payload);
          this.chunkMoviesForCarousels();
        }
      },
      error: (err) => console.error('Error fetching movies:', err)
    });
  }

  ngAfterViewInit(): void {
    // Initialize carousels after view is rendered
    this.initCarousels();
  }

  organizeMoviesByGenre(movies: any[]): void {
    this.moviesByGenre = {};
    this.availableGenres = [];
    
    movies.forEach(movie => {
      const genres = movie.movieGenre.split(',').map((g: string) => g.trim());
      
      genres.forEach(genre => {
        if (!this.moviesByGenre[genre]) {
          this.moviesByGenre[genre] = [];
          this.availableGenres.push(genre);
        }
        this.moviesByGenre[genre].push(movie);
      });
    });
    
    this.availableGenres.sort();
  }

  chunkMoviesForCarousels(): void {
    this.availableGenres.forEach(genre => {
      const movies = this.moviesByGenre[genre];
      const chunkSize = 6; // Number of movies per slide
      this.chunkedMoviesByGenre[genre] = [];
      
      for (let i = 0; i < movies.length; i += chunkSize) {
        this.chunkedMoviesByGenre[genre].push(movies.slice(i, i + chunkSize));
      }
    });
  }

  initCarousels(): void {
    this.availableGenres.forEach(genre => {
      const carouselElement = document.getElementById(this.getCarouselId(genre));
      if (carouselElement) {
        // Initialize carousel
        new (window as any).bootstrap.Carousel(carouselElement);
      }
    });
  }

  getCarouselId(genre: string): string {
    return genre.toLowerCase().replace(/\s+/g, '-') + '-carousel';
  }
}