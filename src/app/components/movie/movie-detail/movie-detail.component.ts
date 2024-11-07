import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MovieService } from '../../../services/movie/movie.service';
/**
 * Componente que nos muestra el poster de la pelicula, la descripcion completa y su reparto
 */
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
  /**
   * Datos del reparto de la pelicula, que serán el nombre del actor, su personaje y su foto
   */
  movieCredits: any;
  /**
   * Id de la pelicula en el API de TMDB
   */
  movieId: string = '';
  /**
   * Instancia de pelicula, que tendrá la ruta al poster y su descripción
   */
  movie: any;
/**
 * Necesitamos 3 parametros en este constructor
 * @param route Ruta actual, la cual usamos para obtener el id de la pelicula y asi obtener su postér y su descripción
 * @param movieService Servicio de peliculas, el cual nos comunica con nuestra API express.js
 * @param router Servicio de enrutado
 */
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}
/**
 * Metodo del ciclo de vida de Angular {@link https://angular.dev/api/core/OnInit}
 */
  ngOnInit() {
    this.movie = history.state.movie;
    if (this.movie) {
      this.movieId = this.route.snapshot.paramMap.get('id') || '';
      console.log(this.movieId);
      if (this.movieId) {
        this.loadMovieCredits();
      }
    }
  }
/**
 * Función que carga los datos del reparto de la pelicula
 */
  private loadMovieCredits() {
    this.movieService.getCredits(this.movieId).subscribe(
      credits => {
        this.movieCredits = credits;
      },
      error => {
        console.error('Error al recibir el reparto de la película:', error);
      }
    );
  }
}