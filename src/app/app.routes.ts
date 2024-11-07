import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'movies',
    loadComponent: () => import('./components/movie/movie-list/movie-list.component').then(m => m.MovieListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'movies/:id',
    loadComponent: () => import('./components/movie/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent),
    canActivate: [authGuard]
  }
];