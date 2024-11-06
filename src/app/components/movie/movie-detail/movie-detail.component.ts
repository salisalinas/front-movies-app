import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MovieService } from '../../../services/movie/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movieCredits: any;
  movieId: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    if (this.movieId) {
      this.loadMovieCredits();
    }
  }

  private loadMovieCredits() {
    this.movieService.getCredits(this.movieId).subscribe(
      credits => {
        this.movieCredits = credits;
      },
      error => {
        console.error('Error al recibi el reparto de la película:', error);
      }
    );
  }
}