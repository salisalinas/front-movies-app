import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.getNowPlaying().subscribe(
      response => {
        this.nowPlayingMovies = response.results;
      },
      error => {
        console.error('Error al recibir las peliculas en cartelera:', error);
      }
    );

    this.movieService.getPopular().subscribe(
      response => {
        this.popularMovies = response.results;
      },
      error => {
        console.error('Error al recibir peliculas populares:', error);
      }
    );
  }

  viewDetails(movie: any) {
    this.router.navigate(['/movies', movie.id], { state: { movie } });
  }
}