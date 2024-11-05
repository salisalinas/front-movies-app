import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:3000/api/movies';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders() {
    return from(this.authService.getAuthToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return Promise.resolve({ headers });
      })
    );
  }

  getNowPlaying(): Observable<any> {
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get(`${this.apiUrl}/now-playing`, headers))
    );
  }

  getPopular(): Observable<any> {
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get(`${this.apiUrl}/popular`, headers))
    );
  }

  getCredits(movieId: string): Observable<any> {
    return this.getHeaders().pipe(
      switchMap(headers => this.http.get(`${this.apiUrl}/credits/${movieId}`, headers))
    );
  }
}