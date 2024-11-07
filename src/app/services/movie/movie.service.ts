import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
/**
 * Servicio que interactua con nuestra API Express.js, que a su vez conecta con la API de TMDB para obtener datos de peliculas
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  /**
   * URL de nuestra API local. Tal y como lo he configurado, es en el puerto 3000 en esa ruta
   */
  private apiUrl = 'http://localhost:3000/api/movies';
/**
 * Necesitamos dos parametros en nuestro constructor
 * @param http Realiza peticiones HTTP
 * @param authService Servicio de auntenticación
 */
  constructor(
    /**
     * Estancia de HttpClient 
     */
    private http: HttpClient,
    /**
     * Estancia de AuthService
     */
    private authService: AuthService
  ) {}
/**
 * Función que obtiene cabeceras de la petición, y ver si tiene un token o no
 * @returns La resolución de la promesa de esos headers
 */
  private getHeaders() {
    return from(this.authService.getAuthToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return Promise.resolve({ headers });
      })
    );
  }
/**
 * Función que obtiene peliculas en cartelera
 * @returns Peliculas en cartelera
 */
  getNowPlaying(): Observable<any> {
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get(`${this.apiUrl}/now_playing`, headers))
    );
  }
/**
 * Función que obtiene peliculas más vistas
 * @returns Peliculas más vistas
 */
  getPopular(): Observable<any> {
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get(`${this.apiUrl}/popular`, headers))
    );
  }
/**
 * Función que obtiene el reparto de una pelicula, según su ID
 * @returns Reparto de la pelicula
 */
  getCredits(movieId: string): Observable<any> {
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get(`${this.apiUrl}/credits/${movieId}`, headers))
    );
  }
}