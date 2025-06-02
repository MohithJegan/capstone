import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css'],
})
export class MovieinfoComponent implements OnInit {
  // @ViewChild('carousel') carousel!: ElementRef;
  // currentIndex = 0;

  @ViewChild('carousel', { static: false }) carousel: ElementRef;

  scrollCarousel(direction: 'prev' | 'next') {
    const carouselEl = this.carousel.nativeElement as HTMLElement;
    const scrollAmount = 220; // adjust depending on item width + margin

    if (direction === 'next') {
      carouselEl.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      carouselEl.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  movieDetails;
  suggestedMovies = [];
  ticketPrice: string;
  showTimings: string[];
  safeMapUrl: SafeResourceUrl | null = null;
  randomDays: number = Math.floor(Math.random() * 11) + 2;
  comments = [
    { comment: 'Absolutely loved the cinematography!', commentedBy: 'Emma' },
    { comment: 'The plot twist was mind-blowing.', commentedBy: 'Liam' },
    {
      comment: 'Acting was top-notch by the lead actor.',
      commentedBy: 'Olivia',
    },
    {
      comment: 'Could have been better in terms of pace.',
      commentedBy: 'Noah',
    },
    { comment: 'Perfect family entertainer.', commentedBy: 'Ava' },
    {
      comment: 'Music and background score gave me chills!',
      commentedBy: 'Ethan',
    },
    {
      comment: 'Felt a little dragged in the second half.',
      commentedBy: 'Sophia',
    },
    {
      comment: 'One of the best movies I watched this year!',
      commentedBy: 'Mason',
    },
    { comment: 'Disappointed with the climax.', commentedBy: 'Isabella' },
    { comment: 'Loved every bit of it. 10/10!', commentedBy: 'Lucas' },
  ];

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

  constructor(
    public userServiceObj: UserService,
    public routerObj: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.movieDetails =
      this.userServiceObj.movieInfoBehaviourSubject.getValue();
    console.log('msms', this.movieDetails);
    if (this.movieDetails?.movieTheatre?.length) {
      const lat = this.movieDetails.movieTheatre[0].latitude;
      const lng = this.movieDetails.movieTheatre[0].longitude;
      const url = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
      this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    // Generate random ticket price between $9.99 and $19.99
    this.ticketPrice = (Math.random() * 10 + 9.99).toFixed(2);

    // Generate random number of shows (3 to 5)
    const showCount = Math.floor(Math.random() * 3) + 3; // 3 to 5 shows

    // Generate random show timings
    this.showTimings = this.generateRandomShowTimings(showCount);

    this.userServiceObj
      .getSuggestedMoviesByGenreName(this.movieDetails.movieGenre)
      .subscribe({
        next: (response) => {
          if (response.message == 'Suggested Movies') {
            //update movie of user selected
            this.suggestedMovies = response.payload[0].filter(
              (movieObj) => movieObj.movieName !== this.movieDetails.movieName
            );
          }
        },
      });
    // this.userServiceObj.getSuggestedMoviesByGenreName(this.movieDetails.movieGenre).subscribe({
    //   next: (response) => {
    //     if (response.message === "Suggested Movies") {
    //       // Store the full array
    //       const allMovies = response.payload[0];

    //       // Chunk the array into groups of 5
    //       this.suggestedMovies = this.chunkMovies(allMovies, 5);
    //     }
    //   }
    // });
  }

  getLanguageNameByCode(code: string): string {
    const found = this.languages.find((lang) => lang.code === code);
    return found ? found.name : code;
  }

  generateDay() {
    this.randomDays = Math.floor(Math.random() * 11) + 2;
    return this.randomDays;
  }

  scrollToItem(index: number) {
    const carousel = this.carousel.nativeElement;
    const items = carousel.querySelectorAll('.recommendation-item');
    if (!items[index]) return;

    items[index].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  // Utility function to generate random timings
  generateRandomShowTimings(count: number): string[] {
    const timings = [];
    const hours = [10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const meridiem = ['AM', 'PM'];

    while (timings.length < count) {
      const hour = hours[Math.floor(Math.random() * hours.length)];
      const minute = Math.random() < 0.5 ? '00' : '30';
      const period = meridiem[Math.floor(Math.random() * meridiem.length)];
      const time = `${hour}:${minute} ${period}`;
      if (!timings.includes(time)) {
        // avoid duplicates
        timings.push(time);
      }
    }
    return timings;
  }

  getMapUrl(): SafeResourceUrl {
    const lat = this.movieDetails.movieTheatre[0].latitude;
    const lng = this.movieDetails.movieTheatre[0].longitude;
    const url = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
