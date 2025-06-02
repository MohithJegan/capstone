import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
})
export class GenreComponent implements OnInit {
  constructor() {}

  firstColumn = [
    { name: 'Action', icon: 'fa-gun' },
    { name: 'Drama', icon: 'fa-masks-theater' },
    { name: 'Mystery', icon: 'fa-magnifying-glass' },
    { name: 'Adventure', icon: 'fa-map-marked-alt' },
    { name: 'Family', icon: 'fa-home' },
    { name: 'Comedy', icon: 'fa-laugh-squint' },
    { name: 'Animation', icon: 'fa-dragon' }
  ];

  secondColumn = [
    { name: 'History', icon: 'fa-landmark' },
    { name: 'TV Movie', icon: 'fa-tv' },
    { name: 'Crime', icon: 'fa-user-secret' },
    { name: 'Horror', icon: 'fa-ghost' },
    { name: 'Western', icon: 'fa-hat-cowboy' },
    { name: 'Science Fiction', icon: 'fa-rocket' },
  ];

  thirdColumn = [
    { name: 'War', icon: 'fa-fighter-jet' },
    { name: 'Music', icon: 'fa-music' },
    { name: 'Documentary', icon: 'fa-film' },
    { name: 'Thriller', icon: 'fa-heartbeat' },
    { name: 'Romance', icon: 'fa-heart' },
    { name: 'Fantasy', icon: 'fa-wand-magic-sparkles' }
  ];

  ngOnInit() {
    
  }
}
