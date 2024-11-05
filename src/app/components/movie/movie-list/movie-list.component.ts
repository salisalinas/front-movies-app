import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  nowPlayingMovies: any[] = [];
  popularMovies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.getNowPlaying().subscribe(
      response => {
        this.nowPlayingMovies = response.results;
      },
      error => {
        console.error('Error fetching now playing movies:', error);
      }
    );

    this.movieService.getPopular().subscribe(
      response => {
        this.popularMovies = response.results;
      },
      error => {
        console.error('Error fetching popular movies:', error);
      }
    );
  }
}