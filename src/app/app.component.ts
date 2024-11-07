import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserData } from './models/userData.model';
import { MayusPipe } from './pipes/mayus.pipe';
/**
 * Componente principal de nuestra aplicación Angular, en el que insertamos otros componentes.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    MatToolbarModule, 
    MatButtonModule,
    MayusPipe
  ],
  templateUrl: './app.component.html',
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .welcome-text {
      margin-right: 16px;
      font-size: 14px;
    }
  `]
})
export class AppComponent implements OnInit {
  /**
   * Datos de nuestro usuario actualmente logeado, a los cuales podemos acceder.
   */
  user$: Observable<UserData | null>;
  /**
   * Nombre de nuestro usuario que aparece en el navbar si esta logeado.
   */
  userName: string = '';
/**
 * 
 * @param authService Nos permite detectar si el usuario esta logeado para mostrar un menú u otro en el navbar
 * @param router Para navegar por todas las rutas de nuesta aplicación.
 */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = this.authService.userData$;
    this.user$.subscribe(userData => {
      console.log(userData);
      if (userData) {
        this.userName = `${userData.nombre} ${userData.apellidos}`;
      }
    });
  }
/**
 * Metodo del ciclo de vida de Angular {@link https://angular.dev/api/core/OnInit}
 */
  ngOnInit() {
    this.user$.subscribe(userData => {
      console.log(userData);
      if (userData) {
        this.userName = `${userData.nombre} ${userData.apellidos}`;
      }
    });
  }
/**
 * Método de cerrar sesión.
 */
  async logout() {
    try {
      await this.authService.logout();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}