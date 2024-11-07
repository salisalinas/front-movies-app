import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MovieService } from '../../../services/movie/movie.service';
/**
 * Componente del listado de peliculas, primero las que estan en cartelera, y luego las más vistas
 */
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
  /** Lista de peliculas en cartelera */
  nowPlayingMovies: any[] = [];
  /** Lista de peliculas más vistas */
  popularMovies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {}
/**
 * Metodo del ciclo de vida de Angular {@link https://angular.dev/api/core/OnInit}
 */
  ngOnInit() {
    this.loadMovies();
  }
/**
 * Llama al servicio de peliculas para llamar a nuestra API express.js y recibir los datos de las peliculas en cartelera y las más vistas
 */
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
/**
 * Función para entrar en el detalle de una película
 * @param movie Instancia de nuestro objeto película
 */
  viewDetails(movie: any) {
    this.router.navigate(['/movies', movie.id], { state: { movie } });
  }
}